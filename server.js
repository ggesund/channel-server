const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');

// const multer = require('multer');

const upload = require('./middleware/upload');

const connection = require('./db');

// load config parameters from .env file
require('dotenv').config();

// create the express app
const app = express();

// connect to database with mongoose
// mongoose
//   .connect(process.env.DATABASE)
//   .then(() => {
//     console.log('Successfully connected to database!');
//   })
//   .catch((err) => {
//     console.log(`Failed to connect to databas ${err}.`);
//   });
connection();

// applying necessary middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

// set the public folder
app.use(express.static('./public/images'));

// load the routers
const channelRouter = require('./routes/channelRoutes');
const channelListRouter = require('./routes/channelListRoutes');
const imageRouter = require('./routes/imageRoutes');

// apply the routers
app.use('/api/channel', channelRouter);
app.use('/api/channel-list', channelListRouter);
app.use('/api/image', imageRouter);

// determine port from env file
const port = process.env.PORT || 8000;

// finally start the server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server started on port ${port}.`);
});
