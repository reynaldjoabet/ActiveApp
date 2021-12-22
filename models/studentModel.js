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
        trainingPlans:[
        
        {
            link:"link",
            startDate: new Date("2021-11-31").toDateString(),
            endDate: new Date("2021-11-06").toDateString(),
            week:"week1",
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
                    name:"cycling",
                    date: new Date("2021-11-06").toDateString(),
                    details: null,
                    completed:true
                    
                   }
            ]

        
        },
        {
            link:"link",
            startDate: new Date("2021-12-13").toDateString(),
            endDate: new Date("2021-12-19").toDateString(),
            week:"week2",
            goals:[
                {
                 name:"Running",
                 date: new Date("2021-12-14").toDateString(),
                 details: null,
                 completed:false
                 
                },
                {
                    name:"Running",
                    date: new Date("2021-12-15").toDateString(),
                    details: null,
                    completed:false
                    
                   },
                   {
                    name:"Soccer",
                    date: new Date("2021-12-18").toDateString(),
                    details: null,
                    completed:true
                    
                   }
            ]

        
        },
        {
            link:"link",
            startDate: new Date("2021-12-20").toDateString(),
            endDate: new Date("2021-12-26").toDateString(),
            week:"week3",
            goals:[
                {
                 name:"Running",
                 date: new Date("2021-12-25").toDateString(),
                 details: null,
                 completed: false
                 
                },
                {
                    name:"Jumping",
                    date: new Date("2021-12-23").toDateString(),
                    details: null,
                    completed:false
                    
                   },
                   {
                    name:"Soccer",
                    date: new Date("2021-12-22").toDateString(),
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
async deleteStudentData(username,firstname,lastname){
    return new Promise((resolve,reject)=>{
    this.db.remove({username:username,firstName:firstname,lastName:lastname},(err,numRemoved)=>{
        if(err && (numRemoved<1 || numRemoved>1)){
          reject(err);
        } else{
            logger.info(`User data successfully deleted`);
        }
    })
})

}

async deleteGoal(username,week,date,name){
    return new Promise((resolve,reject)=>{
    this.db.remove({username:username, 'trainingPlans.week':week,'trainingPlans.goals.name':name,'trainingPlans.goals.date':date},(err,numRemoved)=>{
        if(err && (numRemoved<1 || numRemoved>1)){
          reject(err);
        } else{
            logger.info(`Goal deleted`);
        }
    })
})

}

async addGoal(username,goal,startDate,endDate){
    return new Promise((resolve,reject)=>{
        this.db.update({ username:username,'trainingPlans.startDate':startDate,'trainingPlans.endDate': endDate}, { $push: { 'trainingPlans.goals': goal } }, {}, function (err,numUpdated) {
           if(err){
               reject(err);
               logger.error("an error occured while trying to add goal")
           } else{
            resolve(numUpdated);
            logger.info("user data updated")
           }
          });
})

}
async goalCompleted(username,date,name,completed){
    return new Promise((resolve,reject)=>{
        this.db.update({ username:username,'trainingPlans.goals.date':date,'trainingPlans.goals.name':name}, { $push: { 'trainingPlans.goals.completed': completed} }, {}, function (err,numUpdated) {
           if(err){
               reject(err);
               logger.error("error occured while updating goal status to completed")
           } else{
               resolve(numUpdated);
               logger.info("user info updated")
           }
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