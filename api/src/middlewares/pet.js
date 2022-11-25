const { Router } = require("express");
const { getAllPets, getPetByPK, getByPetOwner } = require("../controllers/getAllPets.js");
const router = Router();

router.get('/', async (req, res) => {
    try {
        const allPets = await getAllPets(req.query.name);
        res.status(200).json(allPets);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const pet = await getPetByPK(id);
        res.status(200).json(pet);
    } catch (error) {
        res.status(404).send(error);
    }
});

// router.get('/:UserId', async (req, res) => {
//     try {
//         const { UserId } = req.params;
//         const petOwner = await getByPetOwner(UserId);
//         res.status(200).json(petOwner);
//     } catch (error) {
//         res.status(404).send(error);
//     }
// });

module.exports = router;
