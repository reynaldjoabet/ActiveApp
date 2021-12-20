const nedb= require('nedb');
const logger = require('../logger');
const bcrypt = require('bcrypt');
class StudentModel{
constructor(dbFilePath){
    if(dbFilePath){
//create student db
this.db= new nedb({filename:dbFilePath,autoload:true});
logger.info("DB connected to "+ dbFilePath);

    } else {
        this.db=new nedb();
    }
}

init(){
       this.db.insert({
        username:"user1",
        firstName:"Paul",
        lastName:"Peter",
        email:"admin@gmail.com",
        password: bcrypt.hashSync("123",10),
        gender:"Female",
        suspended: false,
        trainingPlans:[{
            link:"link",
            startDate: new Date("2021-10-23").toDateString(),
            endDate: new Date("2021-10-30").toDateString(),
            week:"week1",
            goals:[
                {
                 name:"Running",
                 date: new Date("2021-10-25").toDateString(),
                 details: null,
                 completed:true
                 
                },
                {
                    name:"Jumping",
                    date: new Date("2021-10-26").toDateString(),
                    details: null,
                    completed:false
                   },
                   {
                    name:"Soccer",
                    date: new Date("2021-10-26").toDateString(),
                    details: null,
                    completed:false
                    
                   }
            ]

        
        },
        {
            link:"link",
            startDate: new Date("2021-11-31").toDateString(),
            endDate: new Date("2021-11-06").toDateString(),
            name:"week2",
            goals:[
                {
                 name:"Running",
                 date: new Date("2021-11-2").toDateString(),
                 details: null,
                 completed:true
                 
                },
                {
                    name:"Jumping",
                    date: new Date("2021-11-04").toDateString(),
                    details: null,
                    completed:false
                    
                   },
                   {
                    name:"Soccer",
                    date: new Date("2021-11-06").toDateString(),
                    details: null,
                    completed:true
                    
                   }
            ]

        
        }

        ]

    })
}


async getStudentDataByUsername(userName){
    return new Promise((resolve,reject)=>{
        this.db.findOne({username:userName},{_id:0,suspended:0},(error,data)=>{
            if(error){
                reject(error);
                logger.info(`Error while retrieving data `);
            } else {
                resolve(data);
                logger.info(` data of  successfully retrieved`);
            }
        })
    })
} //end of getStudentData

async getDataExcludingPassword(userName){
    return new Promise((resolve,reject)=>{
        this.db.findOne({username:userName},{_id:0,suspended:0,password:0},(error,data)=>{
            if(error){
                reject(error);
                logger.info(`Error while retrieving data `);
            } else {
                resolve(data);
                logger.info(` data of  successfully retrieved`);
            }
        })
    })
} 
async searchByWeek(week){
    return new Promise((resolve,reject)=>{
        this.db.findOne({'trainingPlans.week':week},{_id:0,suspended:0,password:0},(error,data)=>{
            if(error){
                reject(error);
                logger.info(`Error while retrieving data `);
            } else {
                console.log(data)
                resolve(data);
                logger.info(` data of  successfully retrieved`);
            }
        })
    })
}
async deleteStudentData(email,firstname,lastname){
    return new Promise((resolve,reject)=>{
    this.db.remove({email:email,firstName:firstname,lastName:lastname},(err,numRemoved)=>{
        if(err && (numRemoved<1 || numRemoved>1)){
          reject(err);
        } else{
            logger.info(`User data successfully deleted`);
        }
    })
})

}

async deleteGoal(email,goal,date){
    return new Promise((resolve,reject)=>{
    this.db.remove({email:email, trainingPlans:{goals:{date:date}},trainingPlans:{goals:{name:goal}}},(err,numRemoved)=>{
        if(err && (numRemoved<1 || numRemoved>1)){
          reject(err);
        } else{
            logger.info(`Goal deleted`);
        }
    })
})

}

async addGoal(email,goal,date){
    return new Promise((resolve,reject)=>{
        this.db.update({ email:email,trainingPlans:{goals:{date:date}} }, { $push: { fruits: 'banana' } }, {}, function () {
            // Now the fruits array is ['apple', 'orange', 'pear', 'banana']
          });
})

}

async register(user){
    return new Promise((resolve,reject)=>{
    this.db.insert(user,(err,numRemoved)=>{
        if(err && (numRemoved<1 || numRemoved>1)){
          reject(err);
        } else{
            logger.info(`User data successfully registered`);
        }
    })
})


}













}




module.exports=StudentModel;