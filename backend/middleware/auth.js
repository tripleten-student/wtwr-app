const jwt = require('jsonwebtoken');

const { WTWR_JWT_KEY } = process.env;
const UnauthorizedError = require('../errors/unauthorized-error');

/**
 * The **auth** module contains the middleware for authorization
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Authorization Required'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, WTWR_JWT_KEY);
  } catch (err) {
    return next(new UnauthorizedError('Authorization Required'));
  }

  req.user = payload;

  return next();
};

module.exports = auth;
