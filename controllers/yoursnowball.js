const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const aws = require('aws-sdk');

// GET 
const getAllObjets = async (req, res) => {
    try{
        const {ownerId} = req.params.ownerId;

        const foundObjet = await prisma.objet.findMany();

        res.send(foundObjet);
    } catch(err) {
        res.status(500).send(err);
    }

}

// POST 
const postMessage = async (req, res) => {
    try{
        const { writer, comment, objetId, top, left } = req.body;
        const receiverId = parseInt(req.params.ownerId); 
        
        // console.log(req.files)

        //S3에 업로드된 파일 주소 저장하기
        const commonVoice = req.files['commonVoice'][0].location;
        const personalVoice = req.files['personalVoice'][0].location;
        

        const newMessage = await prisma.Message.create({
            data:{
                receiverId: receiverId,
                writer,
                comment,
                commonVoice:commonVoice,
                personalVoice:personalVoice,
                objetId: parseInt(objetId),
                top: parseInt(top),
                left: parseInt(left)
            }
        })
        
        const updateUser = await prisma.User.update({
            where: {
                ownerId: receiverId,
            },
            data: {
                cnt: {
                    increment: 1,
                }
            },
        })
        
        return res.status(200).json({
            "writer" : newMessage.writer,
            "comment" : newMessage.comment,
            "cnt" : updateUser.cnt
        });
    } catch(err) {
        res.status(500).send(err);
    }
};

//export controller functions
module.exports = {
    getAllObjets,
    postMessage
};