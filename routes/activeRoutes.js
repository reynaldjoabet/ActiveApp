const  express =require('express');
const controller=require('../controllers/activeControllers')
const router= express.Router();
router.get('/',controller.home);
router.get('/v1/active',controller.home);
router.get('/v1/active/login',controller.loginGet); // used to display the login form
router.post('/v1/active/login',controller.loginPost); // used to collect the login data
router.get('/v1/active/logout',controller.logout);
router.get('/v1/active/about',controller.about);
router.post('/v1/active/signup',controller.signupPost); // used to collect the data after submit
router.get('/v1/active/signup',controller.signupGet);// used to display the sign up form
router.get('/v1/active/dashboard',controller.dashboard);
router.get('/v1/active/dashboarddata',controller.dashboardData);
router.delete('/v1/active/deleterecent',controller.deleterecent);    //edit trainging plan

router.get('/v1/active/deletegoal',controller.deleteGoal);
router.get('/v1/active/search/',controller.searchByWeek);

router.get('/v1/active/updategoal',controller.updateGoalGet);
router.post('/v1/active/updategoal',controller.updateGoalPost);

router.get('/v1/active/creategoal',controller.createGoalGet); //displays the create goal form
router.post('/v1/active/creategoal',controller.createGoalPost);// used to process the submitted data

router.get('/v1/active/custom404',controller.custom404);
module.exports =router;