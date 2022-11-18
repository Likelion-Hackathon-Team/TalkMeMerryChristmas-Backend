const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// // GET '/api/mysnowball/:ownerId/voices'
const getVoices = async (req, res) => {

}


// // GET '/api/mysnowball/:ownerId/messages/message?messageId=1'
const getOneMsg = async (req,res) => {

}



module.exports = {
    getVoices,
    getOneMsg

};