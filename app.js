const  express =require('express');
const cors = require('cors');
//const bcrypt = require('bcrypt');
//const csurf = require('csurf')
//const compression = require('compression');// to compress response bodies
const router=require('./routes/activeRoutes');
const bodyParser = require('body-parser');
const session = require('express-session')
const app= express();
const {v4:uuidv4}=require('uuid');
const port=process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(session({
    secret:uuidv4(),
    resave:false,
    saveUninitialized:true
}))
app.use(cors({
    origin:'http://localhost:3000'
}));
// compress all responses
//app.use(compression());
app.use(express.static('public')) // Serves resources from the public folder
app.use('/',router)
app.use('/css',express.static('public/css/'));
app.use('/javascript',express.static('public/javascript/'));
app.use('/images',express.static('public/images/'));
app.use(function(req, res) {
    res.status(404);
 
    res.send('Oops! We didn\'t find you. want to go back to the home page from here');
   }) 
app.use((req,res,next)=>{
    res.status(500);
    res.send("Internal Server Error");

})
app.listen(port,()=>{
    console.log(`Server started on port : ${port}`)
})