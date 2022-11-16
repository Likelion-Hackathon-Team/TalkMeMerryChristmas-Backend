const express = require('express')

// 컨트롤러 가져오기
userController = require('../controllers/user');
mySbControoller = require('../controllers/mysnowball');
yourSbController = require('../controllers/yoursnowball');


const router = express.Router()


// 로그인 / 회원가입 API 
router.post('/user', userController.postUser);
router.post('/login', userController.login);
router.get('/login', userController.getUser);

// 내 스노우볼 관련 API


// 남의 스노우볼 관련 API



module.exports = router