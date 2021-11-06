const path=require('path');
// the homepage 
exports.home=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/','home.html'));
}


exports.loginPost=(req,res)=>{
    const credentials={
        firstName:"George",
        username:"admin",
        password:"123"
    }
        if(req.body.username==credentials.username && req.body.password==credentials.password){
         req.session.user=req.body.username;// change to username
         res.redirect('/active/dashboard');
         //res.send("login successful")
        }
        else{
          res.send("invalid credentials");
        }
}


exports.loginGet=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/','login.html'));
}


exports.logout=(req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            //log the error
            console.log(err);
            //res.send("error");
        } else{
            res.redirect('/active/login');
        }
    });
   
}


exports.about=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','about.html'));
}

exports.signupPost=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','about.html'));
}


exports.signupGet=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','signup.html'));
}

exports.dashboard=(req,res)=>{
    if(req.session.user){
        res.sendFile(path.join(__dirname,'../views/','dashboard.html'))
    }else{
        res.status(401);
        res.redirect('/active/login');
    }
    
}

exports.dashboardData=(req,res)=>{
    const credentials={
        firstName:"George",
        username:"admin",
        password:"123"
    }

    if(req.session.user){
        res.json(credentials);
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