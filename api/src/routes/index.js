const { Router, json } = require("express");
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

router.use(
  "/admin",
  passport.authenticate("jwt", { session: false }),
  admController
);
router.use(
  "/service",
  passport.authenticate("jwt", { session: false }),
  serviceController
);
router.use(
  "/pet",
  passport.authenticate("jwt", { session: false }),
  petController
);
router.use(
  "/vet",
  passport.authenticate("jwt", { session: false }),
  vetController
);
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

module.exports = router;
