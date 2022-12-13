const { Router, json } = require("express");
const cualquiera = require("../middlewares/passport");
const { User, Admin, Vet } = require("../db");
const router = Router();
router.use(json());
const passport = require("passport");
const serviceController = require("../middlewares/service");
const admController = require("../middlewares/admin");
const petController = require("../middlewares/pet");
const vetController = require("../middlewares/vet");
const turnController = require("../middlewares/turn.js");
const userController = require("../middlewares/user.js");
const paymentController = require("../middlewares/payments");
const autentController = require("../middlewares/autent");
const favoriteMeddleware = require("../middlewares/favor");
const autAdmin = require("../middlewares/autAdmin.js");

router.use("/favoriote", favoriteMeddleware);
router.use(
  "/admin",
  // passport.authenticate("jwt", { session: false }),
  admController
);
router.use("/service", serviceController);
router.use(
  "/pet",
  passport.authenticate("jwt", { session: false }),
  petController
);
router.use("/vet", vetController);
router.use(
  "/turn",
  passport.authenticate("jwt", { session: false }),
  turnController
);
router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userController
);
router.use(
  "/payment",
  passport.authenticate("jwt", { session: false }),
  paymentController
);
router.use("/", autentController);
router.use("/autadmin", autAdmin);

async function userActualizado(req, res, next) {
  const { id } = req.params;
  const {
    name,
    lastname,
    username,
    password,
    confirmationpass,
    email,
    address,
    dni,
    isAdmin,
    isActive,
  } = req.body;

  try {
    let user = await User.findByPk(id);
    user.name = name ? name : user.name;
    user.lastname = lastname ? lastname : user.lastname;
    user.username = username ? username : user.username;
    user.password = password ? password : user.password;
    user.confirmationpass = confirmationpass
      ? confirmationpass
      : user.confirmationpass;
    user.email = email ? email : user.email;
    user.address = address ? address : user.address;
    user.dni = dni ? dni : user.dni;
    user.isAdmin = typeof isAdmin === "boolean" ? isAdmin : user.isAdmin;
    user.isActive = typeof isActive === "boolean" ? isActive : user.isActive;

    await user.save();
    res.send("usuario actualizado");
  } catch (error) {
    next(error);
  }
}
router.put(
  "/user/:id",
  passport.authenticate("jwt", { session: false }),
  userActualizado
);

async function adminActualizado(req, res, next) {
  const { id } = req.params;
  const {
    name,
    lastname,
    username,
    password,
    confirmationpass,
    email,
    address,
    dni,
    isAdmin,
    isActive,
  } = req.body;

  try {
    let admin = await Admin.findByPk(id);
    admin.name = name ? name : admin.name;
    admin.lastname = lastname ? lastname : admin.lastname;
    admin.username = username ? username : admin.username;
    admin.password = password ? password : admin.password;
    admin.confirmationpass = confirmationpass
      ? confirmationpass
      : admin.confirmationpass;
    admin.email = email ? email : admin.email;
    admin.address = address ? address : admin.address;
    admin.dni = dni ? dni : admin.dni;
    admin.isAdmin = typeof isAdmin === "boolean" ? isAdmin : admin.isAdmin;
    admin.isActive = typeof isActive === "boolean" ? isActive : admin.isActive;

    await admin.save();
    res.send("admin actualizado");
  } catch (error) {
    next(error);
  }
}
router.put("/admin/:id", adminActualizado);

async function vetActualizado(req, res) {
  const { id } = req.params;
  const {
    name,
    lastname,
    speciality,
    email,
    address,
    img,
    dni,
    inicialDate,
    finishDate,
    isActive,
  } = req.body;

  try {
    let vet = await Vet.findByPk(id);
    vet.name = name ? name : vet.name;
    vet.lastname = lastname ? lastname : vet.lastname;
    vet.speciality = speciality ? speciality : vet.speciality;
    vet.email = email ? email : vet.email;
    vet.address = address ? address : vet.address;
    vet.img = img ? img : vet.img;
    vet.dni = dni ? dni : vet.dni;
    vet.inicialDate = inicialDate ? inicialDate : vet.inicialDate;
    vet.finishDate = finishDate ? finishDate : vet.finishDate;
    vet.isActive = typeof isActive === "boolean" ? isActive : vet.isActive;

    await vet.save();
    res.status(200).send("vet actualizado");
  } catch (error) {
    res.send(error.message);
  }
}
router.put("/vet/:id", vetActualizado);
module.exports = router;
