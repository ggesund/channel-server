const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const { Schema } = mongoose;

const channelSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      minlength: [3, 'Must be at least 3, got {VALUE}.'],
      maxlength: [32, 'Must be max. 32, got {VALUE}.'],
      required: true,
    },
    label: {
      type: String,
      trim: true,
      minlength: [3, 'Must be at least 3, got {VALUE}.'],
      maxlength: [32, 'Must be max. 32, got {VALUE}.'],
      required: true,
    },
    protocol: {
      type: String,
      enum: ['udp', 'rtp', 'igmp'],
      default: 'igmp',
    },
    multicast: {
      type: String,
      trim: true,
      minlength: [8, 'Must be at least 8, got {VALUE}'],
      maxlength: [64, 'Must be max. 64, got {VALUE}'],
      required: true,
      unique: true,
    },
    port: {
      type: String,
      enum: ['8208', '1234'],
      default: '8208',
    },
    fileName: {
      type: String,
      trim: true,
    },
    image: {
      type: ObjectId,
      ref: 'Image',
    },
    // Referenz zu jeder Liste, in der der Kanal verwendet wird, ist wichtig
    // wenn man Kanal löscht und er wird noch verwendet
    // usedInLists: [{ type: ObjectId, ref: 'ChannelList' }],
  },
  {
    timestamps: true,
  }
);

// now export the schema
module.exports = mongoose.model('Channel', channelSchema);
