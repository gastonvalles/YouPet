require("dotenv").config()
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET
});

const imgUpload = async(img)=>{
  
    try {
        if (img) {
          const uploadRes = await cloudinary.uploader.upload(img, {
            upload_preset: "youpet",
            allowed_formats: ["png", "jpg", "jpeg", "svg"],
          });

          if (uploadRes) {
             return uploadRes.url;
          } else {
            return "";
          }
        } else {
            return "";
        }

      } catch (error) {
        console.log("Error al intentar subir la imagen");
        return "";
      }
}


module.exports = imgUpload;