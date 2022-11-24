const { Router, json } = require("express");
const router = Router();
const users = require("./users.js");
const pets = require("./pet.js");
const serviceController = require("../middlewares/service");

router.use(json());

router.use("/service", serviceController);

router.use("/users", users);

router.use("/pets", pets);

module.exports = router;
