/**
 * The **not-found-error** module contains the constructor for error 404
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
