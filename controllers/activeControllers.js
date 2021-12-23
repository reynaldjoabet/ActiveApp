const path=require('path');
const logger = require('../logger');
const studentModel= require('../models/studentModel');
const bcrypt = require('bcrypt');
const req = require('express/lib/request');
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
    



    exports.addCoachGet=async(_,res)=>{
        res.sendFile(path.join(__dirname,'../views/','addcoach.html'));
    }

    exports.addCoachPost=async(req,res)=>{
        const coachname=req.body.fullname;
        const coachEmail=req.body.email;
        const username=req.session.user;
        const coach={
            coachEmail:coachEmail,
            coachName:coachname
        }
        if(req.session.user){
            await studentDAO.addCoach(username,coach);
            res.redirect('/v1/active/dashboard');
        } else{
            res.redirect('/v1/active/login');// 
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
    const {week}=req.params
    const userData=  await studentDAO.searchByWeek(week);
   res.json(userData);
} else{
   res.status(401);
   res.redirect('/v1/active/login');
}

}

exports.updateGoalGet=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','updategoal.html'));
}
exports.updateGoalPut=(req,res)=>{
    const body=req.body;


    
}
exports.goalcomplete=(req,res)=>{
    if(req.session.user){
        const username=req.session.user
        const date=req.body.date
        const name=req.body.name
     const completed=req.body.completed// will always be true 

     studentDAO.goalCompleted(username,date,name,completed)
        res.redirect('/v1/active/dashboard');
    } else {
        res.status(401);
        res.redirect('/v1/active/login');
    }
}
exports.deleteAccount=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}
exports.deleteGoal= async(req,res)=>{
    if(req.session.user){
        const username=req.session.user
     const {week,name,date}=req.params;

     studentDAO.deleteGoal(username,week,date,name)
        res.redirect('/v1/active/dashboard');
    } else {
        res.status(401);
        res.redirect('/v1/active/login');
    }
}
exports.deleterecent= async(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}

exports.createGoalPost=async (req,res)=>{

    if(!req.session.user){
        res.status(401);
        res.redirect('/v1/active/login');
    } else {
        const username=req.session.user;
    const startDate=req.body.startdate;
    const endDate=req.body.enddate;
    const name=req.body.name;
    const details=req.body.details
   const date=req.body.date;
   const goal={
      name:name,
      date:date,
      details:details,
      completed:false// upon creating a goal, it has not been completed
  }
  }

  await studentDAO.addGoal(username,goal,startDate,endDate);
  res.redirect('/v1/active/dashboard'); 


}
exports.createGoalGet=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','addgoal.html'));
}