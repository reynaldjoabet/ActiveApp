const  express =require('express');
const cors = require('cors');
//const csurf = require('csurf')
//const compression = require('compression');// to compress response bodies
const router=require('./routes/activeRoutes');
//const bodyParser = require('body-parser')
const app= express();
const port=process.env.PORT || 3000

/*

// create application/json parser
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

// POST /login gets urlencoded bodies
app.post('/login', urlencodedParser, function (req, res) {
  res.send('welcome, ' + req.body.username)
})

// POST /api/users gets JSON bodies
app.post('/api/users', jsonParser, function (req, res) {
  // create user in req.body
})
*/
// parse various different custom JSON types as JSON
//app.use(bodyParser.json({ type: 'application/*+json' }))

app.use(cors());
// compress all responses
//app.use(compression());
app.use(express.static('public')) // Serves resources from the public folder
app.use('/',router)
app.use('/css',express.static('public/css/'));
app.use('/javascript',express.static('public/javascript/'));
app.use('/images',express.static('public/images/'));
app.use(function(_, res) {
    res.status(404);
    res.send('Oops! We didn\'t find you. want to go back to the home page from here');
   }) 

app.listen(port,()=>{
    console.log(`Server started on port : ${port}`)
})