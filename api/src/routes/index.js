const { Router, json } = require("express");
const router = Router();
const serviceController = require("../middlewares/service");
const admController = require("../middlewares/Admin");
const userController = require("../middlewares/user");
const petController = require("../middlewares/pet");

router.use(json());

router.use("/admin", admController);
router.use("/service", serviceController);
router.use("/user", userController);
router.use("/pet", petController);

module.exports = router;
