const mongoose = require('mongoose');

const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    fileName: {
      type: String,
      trim: true,
      required: true,
    },
    originalName: {
      type: String,
      trim: true,
      required: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    path: {
      type: String,
      trim: true,
    },
    img: {
      data: Buffer,
      contentType: String,
    },
    dimension: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

// now export the schema
module.exports = mongoose.model('Image', imageSchema);
