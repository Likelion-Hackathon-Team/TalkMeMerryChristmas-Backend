const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// GET 'api/mysnowball/:ownerId' 사용자가 가진 오브제 리스트 반환
const getSnowball = async (req, res) => {
    const ownerId = parseInt(req.params.ownerId);
    
    const receiver = await prisma.User.findUnique({
        where:{
            ownerId : ownerId
        },
        select : {
            name: true,
            cnt : true,
        },
    });

    const objets = await prisma.Message.findMany({
        where : {
            receiverId : ownerId,
        },
        select : {
            writer : true,
            top: true,
            left: true,
            Objet : true 
        }
    });

    

    return res.status(200).json({
        "name" : receiver.name,
        "messages" : objets
    });
}



// // GET '/api/mysnowball/:ownerId/messages'
const getAllMsg = async (req,res) => {
    const ownerId = parseInt(req.params.ownerId); 

    
    const receiver = await prisma.User.findUnique({
        where:{
            ownerId : ownerId
        },
        select : {
            name: true
        },
    });
    // console.log(receiver.name);

    const messages = await prisma.Message.findMany({
        where : {
            receiverId : ownerId,
        },
        select:{
            messageId : true,
            writer: true,
            comment: true,
            personalVoice: true
        }
    })

    return res.status(200).send({
        "name" : receiver.name,
        "messages" : messages
    });
}


module.exports = {
    getSnowball,
    getAllMsg
};