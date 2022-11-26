const { Router, json } = require("express");
const router = Router();
const serviceController = require("../middlewares/service");
const turn = require ("../middlewares/turn")
const user =requie("../middlewares/user")

router.use("/admin", admController);
router.use("/service", serviceController);
router.use("/turn",turn);
router.use("/user",user)
module.exports = router;
