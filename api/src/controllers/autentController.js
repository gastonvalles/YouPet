const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { promisify } = require("util");
const { User } = require("../db");
const { transporter } = require("../../config/mailer");

require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

exports.register = async (req, res) => {
  const { name, lastname, username, password, email, dni, address, img } =
    req.body;
  console.log(name, lastname, username, password, email);
  if (
    !name ||
    !lastname ||
    !username ||
    !password ||
    !email ||
    !dni ||
    !address
  ) {
    return res.status(404).send("Debes completar los todos los archivos");
  }
  try {
    const dbSearch = await User.findAll({
      where: {
        email: req.body.email,
      },
    });
    //console.log(dbSearch);
    if (!dbSearch.length) {
      try {
        if (img) {
          const uploadRes = await cloudinary.uploader.upload(img, {
            upload_preset: "youpet",
            allowed_formats: ["png", "jpg", "jpeg", "svg"],
          });

          console.log(uploadRes);

          if (uploadRes) {
            req.body.img = uploadRes.url;
          }
        }
      } catch (error) {
        res.status(500).json({ error: error });
      }
      const newHash = await bcryptjs.hash(req.body.password, 8);
      const token = jwt.sign({ email: req.body.email }, "userKey");
      console.log(token);
      const user = await User.create({
        name: req.body.name,
        address: req.body.address,
        dni: req.body.dni,
        lastname: req.body.lastname,
        username: req.body.username,
        password: newHash,
        email: req.body.email,
        address: req.body.address,
        img: req.body.img,
        confirmationCode: token,
      });
      //console.log(user);
      //console.log(user.username, user.email, user.confirmationCode);
      sendEmail(user.username, user.email, user.confirmationCode);
      return res.status(200).json(user);
    } else {
      return res.status(302).json(dbSearch);
    }
  } catch (error) {
    res.send(error);
  }
};
/* if (dbSearch.status !== "Active") {
  return res
    .status(401)
    .send("Cuenta pendiente. Por favor verifique su Email");
} */

const sendEmail = async (name, email, confirmationCode) => {
  await transporter
    .sendMail({
      from: '"YOUPET" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "¡Bienvenido a YOUPET!", // Subject line
      text: "¡Gracias por Registrarte", // plain text body
      html: `<b>EMAIL DE CONFIRMACION</b>
    <h2>Hello ${name}<h2>
    <p>Thank you for subscribing, confirm your email by clicking on the following link</p>
    <a href="http://localhost:3000/confirm/${confirmationCode}">Click here</a>
    `,
    })
    .then(() => console.log("se mando el email"))
    .catch((err) => console.log(err));
};
exports.verifyUser = (req, res, next) => {
  let decode;
  try {
    decode = jwt.verify(req.params.confirmationCode, "userKey");
  } catch (error) {
    return res.status(404).send(error);
  }

  User.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send("Usuario no encontrado");
      }
      user.status = "Active";
      user.save((err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
      });
      return res.status(200).send("confirmado");
    })
    .catch((e) => console.log("error", e));
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      return res.status(404).send("Debe completar todos los campos");
    }
    const findUser = await User.findOne({
      where: { email },
    });
    if (
      findUser === null ||
      !(await bcryptjs.compare(password, findUser.password))
    ) {
      return res.status(404).send("Contraseña e email invalido");
    }
    const id = findUser.id;
    const token = jwt.sign({ id: id }, "userKey");

    return res.json({
      msg: "usuario logueado satisfactoriamente",
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
      user: {
        id: req.user.id,
        user: req.user.username,
      },
    });
  } catch (error) {
    res.send(error);
  }
};

/* exports.isautent = async (req, res, next) => {
  if (req.cookie.jwt)
    try {
      const decodificada = await promisify(jwt.verify)(
        req.cookies.jwt,
        "userKey"
      );
      const verifUser = await User.findOne({
        where: {
          id: [decodificada.id],
        },
      });
      if (!verifUser) {
        return next();
      }
      req.user = verifUser;
      return next();
    } catch (error) {
      console.log(error);
    }
  else {
    res.redirect("/login");
    next();
  }
}; */
