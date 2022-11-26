const { Router, json } = require("express");
const router = Router();
router.use(json());
const serviceController = require("../middlewares/service");
const admController = require("../middlewares/admin");
const petController = require("../middlewares/pet");
const vetController = require("../middlewares/vet");
const turn= require ("../middlewares/turn.js")
const user= require ("../middlewares/user.js")

router.use("/admin", admController);
router.use("/service", serviceController);
router.use("/pet", petController);
router.use("/vet", vetController);
router.use("/turn", turn);
router.use("/user", user);

module.exports = router;
