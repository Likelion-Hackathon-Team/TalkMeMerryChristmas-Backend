// GET '/api/user' 클라이언트에게 고유 아이디 넘겨주기
const getUser = (req, res) => {
    res.send({message: "success"});
};

// POST 'api/user' 유저 회원가입
const postUser = (req, res) => {
    res.send({message: "success"});
};

// POST 'api/login' 유저 로그인
const login = (req, res) => {
    res.send({message: "success"});
};

//export controller functions
module.exports = {
    getUser,
    postUser,
    login
};