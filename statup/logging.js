require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    winston.add(new winston.transports.Console());
    winston.add(new winston.transports.File({filename: 'logs/vd-logs.log', level:'error'}));
    winston.add(new winston.transports.MongoDB({db:'mongodb://localhost/virtualdars-logs', level:'warning'}));
    winston.exceptions.handle(new winston.transports.Console() , new winston.transports.File({filename: 'logs/vd-logs.log'}));  //winston exception handler quyidagi uncaught exceptionlarni va unhandled rejection ham catch qila oladi
// process.on('uncaughtException', ex => {
//     winston.error('unhandled rejection xatosi \n ' + ex.message, ex);
//     process.exit(1);
// });

// process.on('unhandledRejection', ex => {
//     winston.error(ex.message, ex);
//     process.exit(1);
// });
//
    process.on('unhandledRejection', ex => {
        throw ex;
    });
}