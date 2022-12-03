const { Router } = require("express");
const { User } = require("../db");
const passport = require("passport");
const authController = require("../controllers/autentController.js");

const router = Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get(
  "/protected",
  passport.authenticate("jwt", { session: false }),
  authController.protectedRoute
);
router.get("/logout", authController.logout);
module.exports = router;
