const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


// POST 'api/user' 유저 회원가입
const postUser = async (req, res) => { // try /catch 예외처리는 필수 -> express에서 에러를 핸들링 하지 않으면 서버는 바로 종료됨.
    try{
        const { name, password, userId } = req.body;

        if(!name || !password || !userId) {
            const error = new Error('KEY ERROR');
            error.statusCode = 400;
            throw error;
        }

        const newUser = await prisma.User.create({
            data : {
                name,
                password,
                userId
            }
        })

        res.status(201).json({ownerId: newUser.ownerId});
    } catch (err) {
        res.status(500).json({error: err});
    }
};

// POST 'api/login' 유저 로그인
const login = async (req, res) => {
    try {
        const { userId, password } = req.body;

        const foundUser = await prisma.User.findUnique({where: { userId }});

        if(!foundUser) {
            const error = new Error('USER NOT FOUNT');
            error.statusCode = 404;
            throw error;
        }

        res.status(201).json({ownerId: foundUser.ownerId});
    } catch(error) {
        res.status(500).json({error: error});
    }
};

//export controller functions
module.exports = {
    postUser,
    login
};