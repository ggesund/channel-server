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

    // delete image from filesystem immediately after upload to DB --> carbage collection
    fs.unlink(`./public/images/${uploadedImage.fileName}`, (err) => {
      if (err) {
        throw new Error('Can not delete file from filesystem');
      }
    });

    res.json(uploadedImage);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

// READ single Image
exports.getImage = (req, res) => {};

// READ all images
exports.getAllImages = async (req, res) => {
  try {
    const allImages = await Image.find({}).sort({ originalName: 1 });

    res.json({
      status: 'ok',
      data: allImages,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Can not get all images.');
  }
};

// DELETE an image from DB and file system
exports.deleteImage = async (req, res) => {
  const imageId = req.params.imageId;

  try {
    // find Image in DB

    // const deletedImage = await Image.findById(imageId);

    const deletedImage = await Image.findByIdAndDelete(imageId);
    res.json(deletedImage.originalName);
  } catch (error) {
    console.log(error);
    res.status(400).send('Can not delete image. Maybe not found.');
  }
};

// get all image IDs and orgiginal names
exports.getIdAndName = async (req, res) => {
  try {
    const imageList = await Image.find({})
      .select('originalName')
      .sort({ originalName: 1 });

    res.json({
      status: 'ok',
      data: imageList,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send('Can not get image list (id, originalName).');
  }
};
