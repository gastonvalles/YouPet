const { Router, json } = require("express");
const router = Router();
router.use(json());
const serviceController = require("../middlewares/service");
const admController = require("../middlewares/Admin");

router.use("/admin", admController);
router.use("/service", serviceController);

module.exports = router;
