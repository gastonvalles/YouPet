const { Router } = require("express");
const {
  dbCreateUser
} = require("../controllers/postUser");
const {
  getAllUsers,
  getUserByPK
} = require("../controllers/getAllUsers");
const router = Router();

router.get('/', async (req, res) => {
  try {
    const user = await getAllUsers(req.query.name);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await getUserByPK(id);
    res.status(200).send(userId);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const createUser = await dbCreateUser(req.body);
    res.status(200).json(createUser);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;