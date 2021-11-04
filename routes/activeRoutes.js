const  express =require('express');
const controller=require('../controllers/activeControllers')
const router= express.Router();

router.get('/active',controller.home);
router.post('/active/login',controller.login);
router.get('/active/logout',controller.logout);
router.get('/active/about',controller.about);
router.post('/active/signup',controller.signup);
router.get('/active/plans',controller.plans);


module.exports =router;