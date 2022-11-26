const { Router } = require("express");
const {
    getAllUsers,
    getUserByPK,
} = require("../controllers/getAllUsers.js");
const router = Router();

router.get('/', async (req, res) => {
    try {
        const allUsers = await getAllUsers(req.query.name);
        res.status(200).json(allUsers);
    } catch (error) {
        res.status(404).send(error);
    }
});

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const userId = await getUserByPK(id);
        res.status(200).json(userId);
    } catch (error) {
        res.status(404).send(error);
    }
});

// router.get('/:username', async (req, res) => {
//     try {
//         const { username } = req.params;
//         const user = await getUserByUsername(username);
//         res.status(200).json(user);
//     } catch (error) {
//         res.status(404).send(error);
//     }
// });

module.exports = router;
