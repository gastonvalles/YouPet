const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { transporter } = require("../../config/mailer");
const { Admin } = require("../db");

require("dotenv").config()
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET
});

exports.createAdmin = async (req, res) => {
  const { name, lastname, username, password, email, dni, tel, img, address } =
    req.body;
  if (
    !name ||
    !lastname ||
    !username ||
    !password ||
    !email ||
    !dni ||
    !tel ||
    !address
  ) {
    return res.status(404).send("Debes completar los todos los archivos");
  }
  try {
    const dbSearch = await Admin.findAll({
      where: {
        email: req.body.email,
      },
    });
    if (!dbSearch.length) {
      const newHash = await bcryptjs.hash(req.body.password, 8);
      const token = jwt.sign({ email: req.body.email }, "adminKey");
      const admin = await Admin.create({
        name: req.body.name,
        address: req.body.address,
        dni: req.body.dni,
        tel: req.body.tel,
        lastname: req.body.lastname,
        username: req.body.username,
        password: newHash,
        email: req.body.email,
        img: req.body.img,
        address: req.body.address,
        confirmationCode: token,
      });
      sendEmail(admin.username, admin.email, admin.confirmationCode);
      return res.status(200).json(admin);
    } else {
      return res.status(302).json(dbSearch);
    }
  } catch (error) {
    res.send(error.message);
  }
};

const sendEmail = async (name, email, confirmationCode) => {
  await transporter
    .sendMail({
      from: '"YOUPET" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "¡Bienvenido a YOUPET!", // Subject line
      text: "¡Gracias por Registrarte", // plain text body
      html: `<b>EMAIL DE CONFIRMACION</b>
    <h2>Hello ${name}<h2>
    <p>Gracias por suscribirte, confirmatu email haciendo click en el siguiente link</p>
    <a href="http://localhost:3000/confirm/${confirmationCode}">Click here</a>
    `,
    })
    .then((send) => send("E-mail sent"))
    .catch((error) => error.message);
};

exports.verifyAdmin = (req, res) => {
  let decodify;
  try {
    decodify = jwt.verify(req.params.confirmationCode, "adminKey");
  } catch (error) {
    res.send(error.message);
  }

  Admin.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((admin) => {
      if (!admin) {
        return res.status(404).send("Admin not found");
      }
      admin.isActive = true;
      admin.save((err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
      });
      return res.status(200).send("Confirmed");
    })
    .catch((error) => error.message);
};

exports.loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(404).send("You must complete all fields");
    }
    const findAdmin = await Admin.findOne({
      where: { email },
    });
    if (
      findAdmin === null ||
      !(await bcryptjs.compare(password, findAdmin.password))
    ) {
      return res.status(404).send("Invalid password and email");
    }
    const id = findAdmin.id;
    const token = jwt.sign({ id: id }, "adminKey");

    return res.json({
      msg: "Admin successfully logged in",
      data: token,
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.protectedRoute = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      admin: {
        id: req.admin.id,
        admin: req.admin.username,
      },
    });
  } catch (error) {
    res.send(error.message);
  }
};