const { Router, json } = require("express");
const router = Router();
router.use(json());
const serviceController = require("../middlewares/service");
const turn= require ("../middlewares/turn.js")
const user= require ("../middlewares/user.js")


router.use("/service", serviceController);
router.use("/turn", turn);
router.use("/user", user);




module.exports = router;
