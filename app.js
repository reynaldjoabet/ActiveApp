const  express =require('express');
const cors = require('cors');
const helmet= require('helmet');
const csurf = require('csurf');
const compression = require('compression');// to compress response bodies
const router=require('./routes/activeRoutes');
const bodyParser = require('body-parser');
const session = require('express-session')
const app= express();
const {v4:uuidv4}=require('uuid');
const logger = require('./logger');
const { cookie } = require('express/lib/response');
const port=process.env.PORT || 3000

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({ // to enable cors for this 
    origin:'http://localhost:3000'
}));
app.use(session({
    secret:uuidv4(), // use randomly generated uuid as secrets
    resave:false,
    name: "activewebsessionId",
    saveUninitialized:true,
    maxAge: 1000*60*20,
    cookie:{
        httpOnly: true,
        //secure: true, 
        sameSite: true// strict
    }
}))



app.use(helmet());


/*
// This...
app.use(helmet());

// ...is equivalent to this:
app.use(helmet.contentSecurityPolicy());
app.use(helmet.dnsPrefetchControl());
app.use(helmet.expectCt());
app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());
app.use(helmet.hsts());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());
app.use(helmet.permittedCrossDomainPolicies());
app.use(helmet.referrerPolicy());
app.use(helmet.xssFilter());

*/

 //compress all responses
app.use(compression());



//app.use(function(req, res, next) { 
   // res.locals.csrftoken = req.csrfToken(); 
   // next(); 
//}); 
app.disable("x-powered-by"); 
app.use(express.static('public')) // Serves resources from the public folder
app.use('/',router)
app.use('/css',express.static('public/css/'));
app.use('/javascript',express.static('public/javascript/'));
app.use('/images',express.static('public/images/'));
app.use(function(req, res) {
    res.status(404);
    res.redirect('/v1/active/custom404');
   }) 
app.use((req,res,next)=>{
    res.status(500);
    res.send("Internal Server Error");

})
app.listen(port,()=>{
    logger.info(`Server started on port : ${port}`)
})