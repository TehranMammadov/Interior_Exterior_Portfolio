const winston = require('winston');
const levels = require('./levels.js');
const {formatProduction, formatDevelopment} = require('./logFormat.js');
const color = require('./color.js');
const {config} = require("dotenv");

config()

winston.addColors(color);
const logger = winston.createLogger({
    level: 'trace',
    levels: levels,
});

if (process.env.NODE_ENV == 'production') {
    logger.format = formatProduction;
    logger.add(
        new winston.transports.File({
            filename: './logger/app.log',
            level: 'warn',
            colorize: false,
            maxsize: 5242880, //5mb,
            maxFiles: 15
        }),
        new winston.transports.File({
            handleExceptions: true,
            filename: './logger/error.log',
            level: 'error',
            colorize: false,
            maxsize: 5242880, //5mb,
            maxFiles: 15, 
        })
    );
} else {
    logger.format = formatDevelopment;
    logger.add(
        new winston.transports.Console({
            level: 'debug',
            maxsize: 5242880,//5mb
            colorize: true
        })
    );
}

module.exports = logger;