/**
 * The **bad-request-error** module contains the constructor for error 400
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = BadRequestError;
