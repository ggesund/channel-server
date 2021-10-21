const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, './public/images/');
//   },
//   filename: (req, file, cb) => {
//     // get extension

//     // falls es mehrere ext. gibt holen wir uns mit pop() das letzte Element aus dem Array
//     // z.B. bei filname.svg.png => png
//     const extension = file.originalname.split('.').pop();

//     cb(null, `${Date.now()}.${extension}`);
//   },
// });

// we do not need to save the file on the disk --> only in memory
// therefore we are using memoryStorage which adds a file object to req object

const storage = multer.memoryStorage();

module.exports = multer({ storage });
