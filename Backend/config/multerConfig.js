const multer = require("multer");
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: { fileSize: 16 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];

    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("invalid File Type"), false);
    }
  },
});

module.exports = upload;
