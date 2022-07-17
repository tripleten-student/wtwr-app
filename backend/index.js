const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const { requestLogger, errorLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');
const { localdb } = require('./utils/config');
const mainRouter = require('./routes/index');

/**
 * This is the main entry point for the backend
 *
 * @author [Devin Jaggernauth](https://github.com/mentalcaries)
 * @author [Hoang Le Chau](https://github.com/hoanglechau)
 */

const app = express();

const { PORT = 4000, NODE_ENV, MONGO_URI } = process.env;

mongoose.connect(NODE_ENV === 'production' ? MONGO_URI : localdb);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(helmet());

app.use(cors());
app.options('*', cors());
app.use(requestLogger);

app.use('/', mainRouter);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

app.use(errorLogger);
app.use(errors());

app.use(errorHandler);
