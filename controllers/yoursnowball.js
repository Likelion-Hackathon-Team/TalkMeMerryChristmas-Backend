const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const aws = require('aws-sdk');

// POST 
const postMessage = async (req, res) => {
    // try { 
        const { writer, comment, objetId, top, left } = req.body;
        const receiverId = parseInt(req.params.ownerId); 
        
        console.log(req.files)

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
        
        
        
        return res.status(200).send([{
            "newMesssageWriter" : newMessage.writer,
            "newMessageComment" : newMessage.comment
        }]);
    // } catch(err) {
    //     res.status(err.statusCode).json({ "message" : err.message });
    // }
};



//export controller functions
module.exports = {
    postMessage
};