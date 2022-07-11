const express = require('express');
require('dotenv').config();
// const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const app = express();
app.use(helmet());
app.use(cors);
app.options('*', cors());

const { PORT = 3000, NODE_ENV, MONGO_URI } = process.env;

// mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : localdb);

app.use(express.json());

const mainRouter = require('./routes/index');

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
