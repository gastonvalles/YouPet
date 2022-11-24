const { Router } = require('express');
const router = Router();
const users = require("./users.js");
const pets = require("./pet.js");

router.use("/users", users);

router.use("/pets", pets);

module.exports = router;