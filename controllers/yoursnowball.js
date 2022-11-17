const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// POST 
const postMessage = async (req, res) => {
    // try { 
        const { writer, comment, objetId, top, left, commonVoice, personalVoice } = req.body;
        const receiverId = parseInt(req.params.ownerId); 
        const newMsgObjet = await prisma.MsgObjet.create({
            data : {
                objetId,
                top,
                left
            }
        })

        const newMessage = await prisma.Message.create({
            data:{
                receiverId: receiverId,
                writer,
                comment,
                commonVoice,
                personalVoice,
                msgObjetId: newMsgObjet.msgObjetId
            }
        })

        
        return res.status(200).send([{
            "MsgObjetId": newMsgObjet.msgObjet,
            "MsgObjet ObjetId": newMsgObjet.objetId,
            "newMesssageWriter" : newMessage.writer
        }]);
    // } catch(err) {
    //     res.status(err.statusCode).json({ "message" : err.message });
    // }
};



//export controller functions
module.exports = {
    postMessage
};