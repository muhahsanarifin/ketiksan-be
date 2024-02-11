const path = require("path");

const DatauriParser = require("datauri/parser");
const cloudinary = require("../config/cloudinary");

const uploadWithCloudinary = async ({ name, folder, file }) => {
  const parser = new DatauriParser();
  const ext = path.extname(file.originalname).toString();
  const datauri = parser.format(ext, file.buffer);
  const fileName = name.includes(" ")
    ? name.toLowerCase().split(" ").join("-")
    : name.toLowerCase();
  const cloudinaryOpt = {
    public_id: fileName,
    folder: folder,
    overwrite: true,
  };
  try {
    const result = await cloudinary.uploader.upload(
      datauri.content,
      cloudinaryOpt
    );

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = uploadWithCloudinary;
