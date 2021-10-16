const express = require('express');

let router = express.Router();

// import the controllers
const {
  getChannels,
  getChannelsWithImages,
  createChannel,
} = require('../controllers/channelController');

// middleware which apply to the whole route -> for testing purposes
router.use((req, res, next) => {
  const current = new Date();
  console.log('channelRoutes: ', current.toLocaleString());
  next();
});

// get all channels
// GET /api/channel
router.get('/', getChannels);
router.get('/withimages', getChannelsWithImages);

// create a new channel
// POST /api/channel
router.post('/', createChannel);

module.exports = router;
