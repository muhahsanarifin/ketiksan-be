const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.KETIKSAN_CLOUD_NAME,
  api_key: process.env.KETIKSAN_API_KEY,
  api_secret: process.env.KETIKSAN_API_SECRET,
  secure: true,
});

module.exports = cloudinary;
