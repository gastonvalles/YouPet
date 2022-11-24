const { Router, json } = require("express");
const router = Router();
router.use(json());
const serviceController = require("../middlewares/service");

router.use("/service", serviceController);
module.exports = router;
