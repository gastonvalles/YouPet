const { Router, json } = require("express");
const cualquiera = require("../middlewares/passport");
const { User } = require("../db");
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

router.use("/favoriote", favoriteMeddleware);
router.use(
  "/admin",
  admController
);
router.use(
  "/service",
  serviceController
);
router.use(
  "/pet",
  passport.authenticate("jwt", { session: false }),
  petController
);
router.use(
  "/vet",
  vetController
);
router.use(
  "/turn",
  passport.authenticate("jwt", { session: false }),
  turnController
);
router.use(
  "/user",
  userController
);
router.use(
  "/payment",
  passport.authenticate("jwt", { session: false }),
  paymentController
);
router.use("/", autentController);

async function userctualizado(req, res, next) {
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
    user.isAdmin = isAdmin ? isAdmin : user.isAdmin;
    user.isActive = isActive ? isActive : user.isActive;

    await user.save();
    res.send("usuario actualizado");
  } catch (error) {
    next(error);
  }
}
router.put("/user/:id", userctualizado);
module.exports = router;
