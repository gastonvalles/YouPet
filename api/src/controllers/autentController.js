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
      });
      //console.log(user);
      sendEmail(req.body.email);
      res.status(200).json(user);
    } else {
      res.status(302).json(dbSearch);
    }
  } catch (error) {
    res.send(error);
  }
};

const sendEmail = async (email) => {
  await transporter.sendMail({
    from: '"YOUPET" <foo@example.com>', // sender address
    to: email, // list of receivers
    subject: "¡Bienvenido a YOUPET!", // Subject line
    text: "¡Gracias por Registrarte", // plain text body
    html: "<b>(BIENVENIDOS)</b>", // html body
  });
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
    const cookies = {
      expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };
    res.cookie("jwt", token, cookies);
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
exports.logout = (req, res) => {
  res.clearCookie("jwt");
  return res.redirect("/");
};
