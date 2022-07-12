const winston = require('winston');
const expressWinston = require('express-winston');

/**
 * The **logger** module contains the two loggers for requests and errors
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: './logs/request.log' })],
  format: winston.format.json(),
});

// error logger
const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: './logs/error.log' })],
  format: winston.format.json(),
});

module.exports = { requestLogger, errorLogger };
