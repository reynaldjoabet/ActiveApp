const path=require('path');
const logger = require('../logger');
const studentModel= require('../models/studentModel');
const bcrypt = require('bcrypt');
//const studentDAO= new studentModel();//for development
const studentDAO= new studentModel("students.db"); // for production
//studentDAO.init();
// the homepage 
exports.home=async(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/','home.html'));
} 

exports.loginPost=async(req,res)=>{
         const username=req.body.username;
         const user=  await studentDAO.getStudentDataByUsername(username)

         //const validPassword= await  bcrypt.compare(req.body.password,user.password)
        if(req.body.username==user.username && req.body.password==user.password){
         req.session.user=req.body.username;
         res.redirect('/active/dashboard');


        }
        else{
          res.send("invalid credentials");
        }
}


exports.loginGet=async(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/','login.html'));
}


exports.logout=async(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            //log the error
            logger.info(`Error occured while discarding session `+err)
            //res.send("error");
        } else{
            res.redirect('/active/login');
        }
    });
   
}


exports.about=async(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','about.html'));
}


exports.signupPost=async(req,res)=>{
    try{
        const password=req.body.password;
        const hashPassword= await bcrypt.hash(password,10);
        const username=req.body.username
        studentDAO.register({
            username:username,
            firstName:req.body.firstname,
            lastName:req.body.lastname,
            email:req.body.email,
            password:password,
            suspended: false,
            gender:req.body.gender,
            trainingPlans:[]
        });
        req.session.user=username;
         res.redirect('/active/dashboard');
    } catch(e){
      logger.warn("failed to create hash for user password");
      res.redirect('/active/signup');
    }
    


}


exports.signupGet=async(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}

exports.dashboard= async (req,res)=>{
    if(req.session.user){
        res.sendFile(path.join(__dirname,'../views/','dashboard.html'))
    }
    
}

exports.dashboardData=async(req,res)=>{
         const username=req.session.user;
         const userData=  await studentDAO.getStudentDataByUsername(username);
    if(req.session.user ){
        res.json(userData);
    } else{
        res.status(401);
        res.redirect('/active/login');
    }
    
}


exports.updatePlan=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.updateGoal=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.deleteAccount=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.deleteGoal=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.deletePlan=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}

exports.createPlanPost=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.createPlanGet=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}