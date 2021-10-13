const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/images/');
  },
  filename: (req, file, cb) => {
    // get extension

    // falls es mehrere ext. gibt holen wir uns mit pop() das letzte Element aus dem Array
    // z.B. bei filname.svg.png => png
    const extension = file.originalname.split('.').pop();

    cb(null, `${Date.now()}.${extension}`);
  },
});

module.exports = multer({ storage });
