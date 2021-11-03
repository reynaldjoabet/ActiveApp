const  express =require('express');
const router=require('./routes/appRoutes');
const path= require('path');
const app= express();
const port=process.env.PORT || 3000


app.use(express.static('public')) // Serves resources from the public folder
app.use('/',router)
app.use('/css',express.static('public/css/'));
app.use('/javascript',express.static('public/css/'));
app.use('/images',express.static('public/css/'));

app.listen(port,()=>{
    console.log(`Server started on port : ${port}`)
})