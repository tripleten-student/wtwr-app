const express = require('express');

/**
 * This module contains the main routes
 *
 * @author [Devin Jaggernauth](https://github.com/mentalcaries)
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

const router = express.Router();
const auth = require('../middleware/auth');
const { createUser, login } = require('../controllers/users');
const { validateLogin, validateUser, validateRequestAuth } = require('../middleware/validation');

const userRouter = require('./users');
const clothingRouter = require('./clothing');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);

// Authorization is currently disabled for testing purpose
router.use(auth);

router.use('/users', validateRequestAuth, userRouter);
router.use('/clothing', validateRequestAuth, clothingRouter);

module.exports = router;
