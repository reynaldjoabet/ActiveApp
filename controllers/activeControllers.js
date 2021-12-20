const path=require('path');
const logger = require('../logger');
const studentModel= require('../models/studentModel');
const bcrypt = require('bcrypt');
//const studentDAO= new studentModel();//for development
const studentDAO= new studentModel("students.db"); // for production
studentDAO.init();
// the homepage 
exports.home=async(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/','home.html'));
} 

exports.custom404=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/','custom404.html'));
}
exports.loginPost=async(req,res)=>{
         const username=req.body.username;
         const user=  await studentDAO.getStudentDataByUsername(username);
       if(user!=null){
         const validPassword=  bcrypt.compareSync(req.body.password,user.password)
        if(req.body.username==user.username && validPassword){
         req.session.user=req.body.username;
         res.redirect('/v1/active/dashboard');


        }
        else{
          res.send("/v1/active/login");
        }
    } else{
        res.redirect("/v1/active/signup")
    }
}


exports.loginGet=async(req,res)=>{
    if(req.session.user==null){
    res.sendFile(path.join(__dirname,'../views/','login.html'));
    } else{
        res.redirect('/v1/active/dashboard');
    }
}


exports.logout=async(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
           
            logger.info(`Error occured while discarding session `+err)
            
        } else{
            res.redirect('/v1/active/login');
        }
    });
   
}


exports.about=async(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','about.html'));
}


exports.signupPost=async(req,res)=>{
    
        const password=req.body.password;
        const salt=bcrypt.genSaltSync();
        const hashPassword=  bcrypt.hashSync(password,salt);
        const username=req.body.username
        const user=  await studentDAO.getStudentDataByUsername(username);
        if(user!=null){
            res.redirect('/v1/active/signup');
        } else{
        studentDAO.register({
            username:username,
            firstName:req.body.firstName,
            lastName:req.body.lastName,
            email:req.body.email,
            password:hashPassword,
            suspended: false,
            gender:req.body.gender,
            coach:null,
            trainingPlans:[]
        });
        req.session.user=username;
         res.redirect('/v1/active/dashboard');
    }
    } 
    





exports.signupGet=async(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}

exports.dashboard= async (req,res)=>{
    if(req.session.user){
        res.sendFile(path.join(__dirname,'../views/','dashboard.html'))
    } else{
        res.redirect('/v1/active/login');// 
    }
    
}

exports.dashboardData=async(req,res)=>{
         const username=req.session.user;
         const userData=  await studentDAO.getDataExcludingPassword(username);
    if(req.session.user ){
        res.json(userData);
    } else{
        res.status(401);
        res.redirect('/v1/active/login');
    }
    
}


exports.searchByWeek=async(req,res)=>{
    
    const username=req.session.user;
    const userData=  await studentDAO.getDataExcludingPassword(username);
if(req.session.user ){
    const week="week1";
    const userData=  await studentDAO.searchByWeek(week);
   res.json(userData);
} else{
   res.status(401);
   res.redirect('/v1/active/login');
}

}

exports.updatePlan=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.updateGoalGet=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.updateGoalPost=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.deleteAccount=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.deleteGoal=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.deleterecent=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}

exports.createGoalPost=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.createGoalGet=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}