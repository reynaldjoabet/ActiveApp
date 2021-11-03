const path=require('path');
const public= path.join(__dirname, '../public/');
const express=require('express');
const app=express();
//app.use(express.static(public));
app.use('/css', express.static('.'));
//app.use('/javascript',express.static(path.join(public,'javascript/')));
//console.log(path.join(public,'javascript/'))
// Serves resources from the public folder
exports.home=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/','index.html'))
}
