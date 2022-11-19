const express = require('express')
const upload = require('../modules/multer')
// 컨트롤러 가져오기
const userController= require('../controllers/user');
const mySbController = require('../controllers/mysnowball');
const mySbController2 = require('../controllers/mysnowball2');
const yourSbController = require('../controllers/yoursnowball');


const router = express.Router()


// 로그인 / 회원가입 API 
router.post('/user', userController.postUser);
router.post('/login', userController.login);
// router.get('/login', userController.getUser);

// 내 스노우볼 관련 API
router.get('/mysnowball/:ownerId', mySbController.getSnowball);
router.get('/mysnowball/:ownerId/messages',mySbController.getAllMsg);
router.get('/mysnowball/:ownerId/merryChristmas', mySbController2.getVoices);
router.get('/mysnowball/:ownerId/messages/message', mySbController2.getOneMsg);

// 남의 스노우볼 관련 API
router.get('/:ownerId/objets', yourSbController.getAllObjets);
router.post('/:ownerId/new', upload.fields([{name: "commonVoice",maxCount: 1},{name: "personalVoice",maxCount: 1}]), yourSbController.postMessage);


module.exports = router