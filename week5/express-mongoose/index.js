const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

require('dotenv').config();

const userRouter = require('./routes/userRoutes.js');

const logger = require('./middlewares/logger');
const timer = require('./middlewares/timer');
const port = process.env.PORT || 8080;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('Mongo error: ' + err));

app.use(logger);
//app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api/v1', userRouter); // Parent route


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

const sha1 = require('sha1');
console.log(sha1("password"));
console.log(sha1("password"));
console.log(sha1("password"));

