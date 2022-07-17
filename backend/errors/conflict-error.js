/**
 * The **conflict-error** module contains the constructor for error 409
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
}

module.exports = ConflictError;
