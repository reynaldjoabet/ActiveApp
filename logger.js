const {createLogger,transports,format}=require('winston');

const logger= createLogger({
    transports:[
        new transports.File({
            filename:'active-app.log',
            level:'info',
            format: format.combine(format.timestamp(),format.json())
        })
    ]
})


module.exports=logger;