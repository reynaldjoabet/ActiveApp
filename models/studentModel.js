const nedb= require('nedb');

//create student db
const db= new nedb({filename:"students.db",autoload:true});