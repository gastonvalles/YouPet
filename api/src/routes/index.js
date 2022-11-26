const { Router, json } = require("express");
const router = Router();
const serviceController = require("../middlewares/service");

const turn= require ("../middlewares/turn.js")
const user= require ("../middlewares/user.js")

router.use("/turn", turn);
router.use("/user", user);





module.exports = router;
