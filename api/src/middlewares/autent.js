const { Router } = require("express");
const { User } = require("../db");
const passport = require("passport");
const autController = require("../controllers/autentController");

const router = Router();

router.post("/register", autController.register);
router.post("/login", autController.login);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  autController.protectedRoute
);
router.get("/logout", autController.logout);
module.exports = router;
