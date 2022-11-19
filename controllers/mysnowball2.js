const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// // GET '/api/mysnowball/:ownerId/voices'
const getVoices = async (req,res) => {
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
            commonVoice: true
        }
    })

    return res.status(200).send({
        "name" : receiver.name,
        "messages" : messages
    });
}


// // GET '/api/mysnowball/:ownerId/messages/message?messageId=1'
const getOneMsg = async (req,res) => {
    const ownerId = parseInt(req.params.ownerId); 
    const user = await prisma.User.findUnique({
        where: {
            ownerId : ownerId
        }
    })
    
    const messageId = parseInt(req.query.messageId);
    
    const message = await prisma.Message.findFirst({
        where: {
            receiverId : ownerId,
            messageId : messageId
        }
    })

    if (message==null){
        return res.status(200).json({
            "success" : false,
            "message" : "No such data"
        });
    }

    const userMessage = {
        "writer" : message.writer,
        "comment" : message.comment,
        "personalVoice" : message.personalVoice
    }
    
    const objetId = message.objetId;
    const objet = await prisma.Objet.findUnique({
        where: {
            objetId : objetId
        }
    })

    return res.status(200).json({
        "ownerName" : user.name,
        "message" : userMessage,
        "objetUrl": objet.objetUrl
    });
}


module.exports = {
    getVoices,
    getOneMsg
};