const  express =require('express');
const controller=require('../controllers/activeControllers')
const router= express.Router();

router.get('/active',controller.home);
router.get('/active/login',controller.loginGet); // used to display the login form
router.post('/active/login',controller.loginPost); // used to collect the login data
router.get('/active/logout',controller.logout);
router.get('/active/about',controller.about);
router.post('/active/signup',controller.signupPost); // used to collect the data after submit
router.get('/active/signup',controller.signupGet);// used to display the sign up form
router.get('/active/dashboard',controller.dashboard);
router.get('/active/dashboarddata',controller.dashboardData);
router.put('/active/updateplan',controller.updatePlan);//edit trainging plan
router.put('/active/updategoal',controller.updateGoal);
router.delete('/active/deleteaccount',controller.deleteAccount);
router.delete('/active/deletegoal',controller.deleteGoal);
router.delete('/active/deleteplan',controller.deletePlan);
router.get('/active/update',controller.dashboard);
router.get('/active/createplan',controller.createPlanGet); //displays the create training plan form
router.post('/active/createplan',controller.createPlanPost);// used to process the submitted data


module.exports =router;