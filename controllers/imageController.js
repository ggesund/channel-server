const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Image = require('../models/Image');
// CREATE
// upload an image to MongoDB
// image must exist on filesystem first (is done with multer middleware)
exports.uploadImage = async (req, res) => {
  console.log('uploadImage controller touched.');

  console.log('File', req.file);
  console.log('Body', req.body);

  if (req.file === undefined) {
    return res.send('You must select a file');
  }

  try {
    const newImage = {
      fileName: req.file.filename.toLowerCase(),
      originalName: req.body.fileName.toLowerCase(),
      desc: req.body.description,
      dimension: req.body.dimension,
      img: {
        data: fs.readFileSync(req.file.path),
        contentType: req.file.mimetype,
      },
    };

    const uploadedImage = await new Image(newImage).save();
    res.json(uploadedImage);
  } catch (error) {
    console.log(error);
    res.status(400).send('Can not upload image to DB');
  }
};

// READ single Image
exports.getImage = (req, res) => {};

// READ all images
exports.getAllImages = async (req, res) => {
  try {
    const allImages = await Image.find({});

    res.json({
      status: 'ok',
      data: allImages,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Can not get all images.');
  }
};
