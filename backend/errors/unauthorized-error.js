/**
 * The **unauthorized-error** module contains the constructor for error 401
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedError;
