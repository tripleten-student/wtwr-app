const express = require('express');
const userRouter = require('./users');
const clothingRouter = require('./clothing');

const router = express.Router();

// router.use('/users', userRouter);
router.use('/clothing', clothingRouter);

module.exports = router;
