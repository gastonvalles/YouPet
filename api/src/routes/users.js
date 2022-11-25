const { Router } = require("express");
const router = Router();
const { getAllUsers, getUserByName, getUserByPK } = require("../controllers/getAllUsers.js");

router.get('/', getAllUsers);

router.get('/', getUserByName);

router.get('/:id', getUserByPK);

module.exports = router;