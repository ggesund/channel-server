exports.getChannelLists = (req, res, next) => {
  res.status(200).json({
    status: 'ok',
    data: 'Reached route for getting all channel lists',
  });
};

exports.createChannelList = (req, res, next) => {
  res.status(200).json({
    status: 'ok',
    data: 'Reached route for creating a channel list',
  });
};
