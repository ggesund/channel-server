const express = require('express');

const upload = require('../middleware/upload');

let router = express.Router();

// import the controllers
const {
  uploadImage,
  getImage,
  getAllImages,
  deleteImage,
  getIdAndName,
} = require('../controllers/imageController');

// routes for images
router.post('/upload', upload.single('file'), uploadImage);
router.get('/', getAllImages);
router.get('/idandname', getIdAndName);
router.get('/:imageId', getImage);
router.delete('/:imageId', deleteImage);

module.exports = router;
