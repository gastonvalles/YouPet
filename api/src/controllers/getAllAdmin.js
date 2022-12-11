const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const { Admin } = require("../db");
const { Op } = require("sequelize");
const { transporter } = require("../../config/mailer");

const FirstAdmin = [
  {
    name: "Federico",
    lastname: "Saffores",
    username: "AppFede",
    password: "12345678",
    tel: 2613994310,
    img: "",
    dni: 35987456,
    email: "fedesaffores@gmail.com",
    address: "alberdi 123",
    isAdmin: true,
    isActive: true
  },
  {
    name: "Gaston",
    lastname: "Valles",
    username: "AppGas",
    password: "12345",
    tel: 2619584318,
    img: "",
    dni: 40558498,
    email: "gastonvallesyeou@gmail.com",
    address: "san juan 1511",
    isAdmin: true,
    isActive: true
  },
  {
    name: "Luis",
    lastname: "Goytia",
    username: "AppLuis",
    password: "12345",
    tel: 2619694318,
    img: "",
    dni: 41987456,
    email: "luisgoytia@gmail.com",
    address: "calle falsa 123",
    isAdmin: true,
    isActive: false
  },
  {
    name: "Ernesto",
    lastname: "Velazquez",
    username: "AppErnesto",
    password: "123456",
    tel: 2619994318,
    img: "",
    dni: 32987456,
    email: "ernestovvelazquez@gmail.com",
    address: "calle real 321",
    isAdmin: true,
    isActive: true
  }
];

const getDBAdmin = async (name) => {
  if ((await Admin.count()) === 0) {
    await Admin.bulkCreate(FirstAdmin);
  }
  if (!name) {
    return await Admin.findAll({});
  } else {
    return await Admin.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
};

const getDBAdminByPK = async (id) => {
  if (id) {
    let admin = await Admin.findOne({
      where: {
        id,
      },
    });
    if (!admin) {
      throw new Error("Admin not found");
    }
    return admin;
  } else {
    throw new Error("missing Id");
  }
};

const dbCreateAdmin = async (body) => {
  try {
    const { name, lastname, username, password, email, address, tel, img, dni, isAdmin, isActive } = body;
    if (!name && !lastname && !username && !password && !tel && !dni && !isAdmin && !isActive && !email && !address) {
      throw new Error("Missing params");
    } else {
      await Admin.create(body);
      return `Admin ${body.name} created successfully`;
    }
  } catch (error) {
    throw error;
  }
};
const createAdmin = async (req, res) => {
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

const verifyAdmin = (req, res) => {
  let decode;
  try {
    decode = jwt.verify(req.params.confirmationCode, "adminKey");
  } catch (error) {
    res.send(error.message);
  }

  Admin.findOne({
    confirmationCode: req.params.confirmationCode,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send("Admin not found");
      }
      user.isActive = true;
      user.save((err) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
      });
      return res.status(200).send("Confirmed");
    })
    .catch((error) => error.message);
};

const loginAdmin = async (req, res) => {
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
      user: {
        id: req.user.id,
        user: req.user.username,
      },
    });
  } catch (error) {
    res.send(error.message);
  }
};

const deleteAdmin = async (id) => {
  await Admin.destroy({
    where: { id },
  });
  return `Admin id:${id} deleted sucessfully`;
};

module.exports = {
  getDBAdmin,
  getDBAdminByPK,
  dbCreateAdmin,
  loginAdmin,
  verifyAdmin,
  createAdmin,
  deleteAdmin
};
