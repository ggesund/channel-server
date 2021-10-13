const express = require('express');

const upload = require('../middleware/upload');

let router = express.Router();

// import the controllers
const {
  uploadImage,
  getImage,
  getAllImages,
} = require('../controllers/imageController');

// routes for images
router.post('/upload', upload.single('file'), uploadImage);
router.get('/', getAllImages);
router.get('/:imageId', getImage);

// router.delete('/:filename', deleteImage);

module.exports = router;
