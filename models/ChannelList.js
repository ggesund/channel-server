const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const { Schema } = mongoose;

const channelListSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [3, 'Must be at least 3, got {VALUE}.'],
      maxlength: [32, 'Must be max. 32, got {VALUE}.'],
      required: true,
    },
    description: {
      type: String,
      trim: true,
      minlength: [3, 'Must be at least 3, got {VALUE}.'],
      maxlength: [512, 'Must be max. 512, got {VALUE}.'],
    },

    channels: [
      {
        type: ObjectId,
        ref: 'Channel',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// now export the schema
module.exports = mongoose.model('ChannelList', channelListSchema);
