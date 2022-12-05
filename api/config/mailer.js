const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "youpet8@gmail.com",
    pass: "uvsrrilxijadaxbs",
  },
});
module.exports = {
  transporter,
};
