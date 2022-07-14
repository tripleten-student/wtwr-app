const express = require('express');

const router = express.Router();
const auth = require('../middleware/auth');
const { createUser, login } = require('../controllers/users');
const { validateLogin, validateUser } = require('../middleware/validation');

const userRouter = require('./users');
const clothingRouter = require('./clothing');
const NotFoundError = require('../errors/not-found-error');

router.post('/signin', validateLogin, login);
router.post('/signup', validateUser, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/clothing', clothingRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Requested resource not found'));
});

module.exports = router;
