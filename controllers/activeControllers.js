const path=require('path');
// the homepage 
exports.home=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/','home.html'))
}

exports.login=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/','login.html'))
}

exports.logout=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/','logout.html'))
}

exports.about=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','about.html'))
}
exports.signup=(_,res)=>{
    res.sendFile(path.join(__dirname,'../views/','about.html'))
}
exports.plans=(_,res)=>{
    res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Headers', "*");
    res.json({
        name:"Paul",
        age:12
    })
}