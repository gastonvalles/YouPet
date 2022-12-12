const { Router } = require("express");
const autAdmin = require("../controllers/autentAdmin.js")

const router = Router();

router.post("/registeradmin", autAdmin.createAdmin);
router.post("/loginadmin", autAdmin.loginAdmin);
router.get("/adminlogin/:confirmationCode", autAdmin.verifyAdmin);

module.exports = router;