const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { promisify } = require("util");
const { User } = require("../db");
//const User = require("../models/User");
//const {promisify}= require("")
const { transporter } = require("../../config/mailer");

/* exports.register = async (req, res) => {
  const { name, lastname, username, password, email, dni, address } = req.body;
  //console.log(name, lastname, username, password, email);
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
  let existe = await User.findAll({
    where: { email },
  });
  if (existe.length !== 0) {
    return res.status(404).json("Usuario ya creado");
  }
  let newHash = await bcryptjs.hash(req.body.password, 8);
  User.create({
    name: req.body.name,
    address: req.body.address,
    dni: req.body.dni,
    lastname: req.body.lastname,
    username: req.body.username,
    password: newHash,
    email: req.body.email,
  })
    .then((user) => {
      sendEmail(req.body.email);
      console.log(user);
      res.json({
        success: true,
        message: "Gracias por registrarse",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    })
    .catch((error) => {
      res.send(error);
    });
}; */

exports.register = async (req, res) => {
  const { name, lastname, username, password, email, dni, address } = req.body;
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
    if (!dbSearch.length) {
      const token = jwt.sign({ email: req.body.email }, config.secret);
      //console.log(config.secret);
      const newHash = await bcryptjs.hash(req.body.password, 8);
      const user = await User.create({
        name: req.body.name,
        address: req.body.address,
        dni: req.body.dni,
        lastname: req.body.lastname,
        username: req.body.username,
        password: newHash,
        email: req.body.email,
        address: req.body.address,
        confirmationCode: token,
      });
      //console.log(user);
      await sendEmail(
        user.body.username,
        user.body.email,
        user.body.confirmationCode
      );
      res.status(200).json(user);
    } else {
      res.status(302).json(dbSearch);
    }
    if (dbSearch.status !== "Active") {
      return res
        .status(401)
        .send("Cuenta pendiente. Por favor verifique su Email");
    }
  } catch (error) {
    res.send(error);
  }
};

const sendEmail = async (name, email, confirmationCode) => {
  console.log(name, email, confirmationCode);
  return transporter
    .sendMail({
      from: '"YOUPET" <foo@example.com>', // sender address
      to: email, // list of receivers
      subject: "¡Bienvenido a YOUPET!", // Subject line
      text: "¡Gracias por Registrarte", // plain text body
      html: `<b>EMAIL DE CONFIRMACION</b>
    <h2>Hello ${name}<h2>
    <p>Gracias por suscribirte, confirmatu email haciendo click en el siguiente link</p>
    <a href="http//localhost:3000/confirm/${confirmationCode}">Click here</a>
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
  //console.log(email, password);
  try {
    if (!email || !password) {
      return res.status(404).send("Debe completar todos los campos");
    }
    const findUser = await User.findOne({
      where: { email },
    });
    //console.log(findUser);
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
