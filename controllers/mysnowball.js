const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

// GET 'api/mysnowball/:ownerId' 사용자가 가진 오브제 리스트 반환
const getSnowball = async (req, res) => {
    try {
        const {ownerId} = req.params.user_id;
        // ownerId 에 해당하는 사람 객체 불러오기
        const user = prisma.user.findUnique({where: { ownerId:ownerId }});
        // ownerId 에 해당하는 사람의 스노우볼 메시지 모두 불러오기
        res.json({ok: true, user: user.ownerId});
        // const messages = await prisma.message.findUnique({where: { messageId: ownerId }});

        // 메시지 모두 보내기
        

    } catch(err) {
        // res.send(ownerId)
        res.status(err.statusCode).json({ message : err.message });
    }
}

// // GET '/api/mysnowball/:ownerId/messages'
const getAllMsg = async (req,res) => {

}





module.exports = {
    getSnowball,
    getAllMsg
};