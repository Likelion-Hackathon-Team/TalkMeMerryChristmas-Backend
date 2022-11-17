const express = require('express')

// 컨트롤러 가져오기
const userController= require('../controllers/user');
const mySbController = require('../controllers/mysnowball');
const yourSbController = require('../controllers/yoursnowball');


const router = express.Router()


// 로그인 / 회원가입 API 
router.post('/user', userController.postUser);
router.post('/login', userController.login);

// 내 스노우볼 관련 API
// router.get('/mysnowball', mySbController.getSnowball);
// router.get('/mysnowball/:ownerId/messages',mySbController.getAllMsg);
// router.get('/mysnowball/:ownerId/voices', mySbController.getVoices);
// router.get('/mysnowball/:ownerId/messages/message', mySbController.getOneMsg);





// 남의 스노우볼 관련 API



module.exports = router