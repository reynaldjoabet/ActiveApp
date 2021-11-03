const path=require('path');
// the homepage 
exports.home=(req,res)=>{
    res.sendFile(path.join(__dirname,'../views/','index.html'))
}
