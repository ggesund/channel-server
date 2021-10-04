const express = require('express');

let router = express.Router();

// import the controllers
const {
  getChannelLists,
  createChannelList,
} = require('../controllers/channelListController');

// middleware which apply to the whole route -> for testing purposes
router.use((req, res, next) => {
  const current = new Date();
  console.log('channelListRoutes: ', current.toLocaleString());
  next();
});

// get all channels
// GET /api/channel-list
router.get('/', getChannelLists);

// create a new channel
// POST /api/channel-list
router.post('/', createChannelList);

module.exports = router;
