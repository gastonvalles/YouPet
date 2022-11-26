const { Router, json } = require("express");
const router = Router();
const serviceController = require("../middlewares/service");
<<<<<<< HEAD
const turn = require ("../middlewares/turn")
const user =requie("../middlewares/user")

router.use("/admin", admController);
router.use("/service", serviceController);
router.use("/turn",turn);
router.use("/user",user)
=======
const admController = require("../middlewares/Admin");
const userController = require("../middlewares/user");
const petController = require("../middlewares/pet");

router.use(json());

router.use("/admin", admController);
router.use("/service", serviceController);
router.use("/user", userController);
router.use("/pet", petController);

>>>>>>> 2260f289f4808b3d6f851184357dc0e72b6b8e28
module.exports = router;
