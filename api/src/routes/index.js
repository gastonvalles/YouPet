const { Router, json } = require("express");
const router = Router();
router.use(json());
const serviceController = require("../middlewares/service");
const admController = require("../middlewares/admin");
const petController = require("../middlewares/pet");
const vetController = require("../middlewares/vet");
const turnController = require("../middlewares/turn.js")
const userController = require("../middlewares/user.js")
const paymentController = require("../middlewares/payments")

router.use("/admin", admController);
router.use("/service", serviceController);
router.use("/pet", petController);
router.use("/vet", vetController);
router.use("/turn", turnController);
router.use("/user", userController);
router.use("/payment", paymentController);

module.exports = router;
//