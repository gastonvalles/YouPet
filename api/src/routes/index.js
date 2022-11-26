const { Router, json } = require("express");
const router = Router();
const serviceController = require("../middlewares/service");
const admController = require("../middlewares/admin");

const userController = require("../middlewares/user");
const petController = require("../middlewares/pet");
const vetController = require("../middlewares/vet");
router.use(json());

router.use("/admin", admController);
router.use("/service", serviceController);
router.use("/user", userController);
router.use("/pet", petController);
router.use("/vet", vetController);

module.exports = router;
