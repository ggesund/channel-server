const ChannelList = require('../models/ChannelList');

exports.getChannelLists = async (req, res) => {
  // code for getting the channels
  try {
    let allChannelLists = await ChannelList.find({})
      .populate({
        path: 'channels',
        populate: [{ path: 'image', select: 'originalName' }],
      })
      .sort({ name: 1 });

    res.json({
      status: 'ok',
      data: allChannelLists,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'nok',
      msg: 'Can not get all channel lists.',
    });
  }
};

exports.createChannelList = async (req, res) => {
  try {
    let newChannelList = await new ChannelList(req.body).save();

    res.status(200).json({ status: 'ok', newChannelList });
  } catch (error) {
    res.status(400).send('Can not create channel list');
  }
};
