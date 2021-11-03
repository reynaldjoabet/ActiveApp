const  express =require('express');
const homecontroller=require('../controllers/homeController')
const router= express.Router();
const app=express();
router.get('/',homecontroller.home);


module.exports =router;