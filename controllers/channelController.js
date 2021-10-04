const Channel = require('../models/Channel');

exports.getChannels = async (req, res) => {
  // code for getting the channels
  try {
    let allChannels = await Channel.find({});

    res.json({
      status: 'ok',
      data: allChannels,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      status: 'nok',
      msg: 'Can not get all channels.',
    });
  }
};

exports.createChannel = async (req, res) => {
  // code for getting the channel

  try {
    let newChannel = await new Channel(req.body).save();

    res.status(200).json({ status: 'ok', newChannel });
  } catch (error) {
    // console.log(error);

    if (error.code === 11000) {
      let objKeys = Object.keys(error.keyValue);
      // console.log(objKeys.toLocaleString());
      res.status(400).json({
        status: 'nok',
        msg: `Duplicate error ${objKeys.toLocaleString()}`,
      });
    } else {
      res.status(400).send(error);
    }
  }
};
