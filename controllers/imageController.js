const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const Image = require('../models/Image');
// CREATE
// upload an image to MongoDB
// image exists only in memory (req.file.buffer)
exports.uploadImage = async (req, res) => {
  console.log('uploadImage controller touched.');

  // console.log('File', req.file);
  // console.log('Body', req.body);

  if (req.file === undefined) {
    return res.send('You must select a file');
  }

  try {
    const newImage = {
      fileName: 'Not used',
      originalName: req.body.fileName.toLowerCase(),
      desc: req.body.description,
      dimension: req.body.dimension,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    };

    const uploadedImage = await new Image(newImage).save();

    res.json(uploadedImage);
  } catch (error) {
    console.log(error);
    res.status(400).send(error.message);
  }
};

// READ single Image
exports.getImage = async (req, res) => {
  const imageId = req.params.imageId;

  // console.log('ImageId: ', imageId);

  try {
    const foundImage = await Image.findById(imageId);

    // console.log(foundImage);

    res.json(foundImage);
  } catch (error) {
    console.log(error);
    res.status(400).send(`Can not find image with id ${imageId}`);
  }
};

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

// UPDATE an image
exports.updateImage = async (req, res) => {
  const imageId = req.params.imageId;
  console.log('req.body', req.body.description);

  try {
    if (req.file) {
      const modifiedImage = {
        fileName: 'Not used',
        originalName: req.body.originalName.toLowerCase(),
        desc: req.body.description,
        dimension: req.body.dimension,
        img: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
        },
      };

      const updatedImage = await Image.findByIdAndUpdate(
        imageId,
        modifiedImage,
        { new: true }
      ).select('originalName');

      res.json({ result: 'ok', data: JSON.stringify(updatedImage) });
    } else {
      // nur die Beschreibung aktualisieren
      const updatedImage = await Image.findByIdAndUpdate(
        imageId,
        { desc: req.body.description },
        { new: true }
      );

      res.json({ result: 'ok', data: updatedImage });
    }
  } catch (error) {
    console.log(error);
    res.status(400).send('Can not update the image.');
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
