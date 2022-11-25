const { Router } = require("express");
const router = Router();
const { getAllPets, getPetByPK, getPetByName } = require('../controllers/getAllPets.js');

router.get('/', getAllPets);

router.get('/', getPetByName);

router.get('/:id', getPetByPK);

module.exports = router;