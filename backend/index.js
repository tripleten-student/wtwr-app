const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const auth = require('./middleware/auth');
const { localdb } = require('./utils/config');

const app = express();
app.use(helmet());
app.use(cors());
app.options('*', cors());

const { PORT = 4000, NODE_ENV, MONGO_URI } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_URI : localdb);

app.use(express.json());

const mainRouter = require('./routes/index');

// const { registerUser, loginUser } = require('./middleware/validateUser');

app.use(requestLogger);

/// Sign up requires validation first, then create user ///
// app.post('/signup', registerUser, createUser);

/// Sign in requires email and password validation, then login ///
// app.post('/signin', loginUser, login);

app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.use(errorLogger);

app.use(errors());

// ** Error handler not yet set up **
// app.use(errorHandler);
