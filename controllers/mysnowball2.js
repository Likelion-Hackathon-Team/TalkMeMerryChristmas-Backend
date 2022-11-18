const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// // GET '/api/mysnowball/:ownerId/voices'
const getVoices = async (req, res) => {
    const ownerId = parseInt(req.params.ownerId); 
    const user = await prisma.User.findUnique({
        where: {
            ownerId : ownerId
        }
    })

    return res.status(200).json({
        "name" : user.name,
        "cnt" : user.cnt,
        "allVoiceUrl": user.allVoiceUrl
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
    const message = await prisma.Message.findUnique({
        where: {
            messageId : messageId
        }
    })

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