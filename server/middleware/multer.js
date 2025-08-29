const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

// Set storage engine
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "realestate",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    transformation: [{ width: 1200, height: 800, crop: "limit" }],
  },
});

// Multer with file size limit (5 MB)
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports = upload;
