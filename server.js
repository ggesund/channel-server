const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

// load config parameters from .env file
require('dotenv').config();

// create the express app
const app = express();

// connect to database with mongoose
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Successfully connected to database!');
  })
  .catch((err) => {
    console.log(`Failed to connect to databas ${err}.`);
  });

// applying necessary middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// load the routers
const channelRouter = require('./routes/channelRoutes');
const channelListRouter = require('./routes/channelListRoutes');

// apply the routers
app.use('/api/channel', channelRouter);
app.use('/api/channel-list', channelListRouter);

// determine port from env file
const port = process.env.PORT || 8000;

// finally start the server
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});
