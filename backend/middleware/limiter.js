/**
 * The **limiter** module contains the middleware to limit repeated requests to APIs and endpoints
 *
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

module.exports = limiter;
