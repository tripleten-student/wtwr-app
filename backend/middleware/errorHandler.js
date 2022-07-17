/**
 * The **errorHandler** module contains the centralized error handling middleware which
 * catches all errors that occur while running route handlers and middleware
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

const errorHandler = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'An error occurred on the server' : message,
  });
};

module.exports = errorHandler;
