const { Router } = require("express");
const { User, Vet } = require(".././db");
const {
  getDBVet,
  getDBVetByPK,
  dbCreateVet,
  dbDeleteVet,
} = require("../controllers/getAllVet");

const router = Router();

router.get("/", async (req, res) => {
  try {
    const allVet = await getDBVet(req.query.name);
    res.status(200).json(allVet);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vetPk = await getDBVetByPK(id, req.user);
    res.status(200).json(vetPk);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/addFavorite", async (req, res) => {
  const { id, userid } = req.body;
  try {
    const vet = await Vet.findOne({
      where: { id },
    });
    const user = await User.findOne({
      where: { id: userid },
    });
    await user.addVets(vet);
    await vet.addUsers(user);
    const updateVet = await getDBVetByPK(id, user);
    res.status(200).json(updateVet);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.post("/removeFavorite", async (req, res) => {
  const { id, userid } = req.body;
  try {
    const vet = await Vet.findOne({
      where: { id },
    });
    const user = await User.findOne({
      where: { id: userid },
    });
    await user.removeVets(vet);
    await vet.removeUsers(user);
    const updateVet = await getDBVetByPK(id, user);
    res.status(200).json(updateVet);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get(`/favorites/:userid`, async (req, res) => {
  const { userid } = req.params;
  try {
    const user = await User.findOne({
      where: {
        id: userid,
      },
    });
    const getVets = await user.getVets();
    return res.json(getVets);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const createVet = await dbCreateVet(req.body);
    res.status(200).json(createVet);
  } catch (error) {
    res.status(404).send(error.message);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const vet = await dbDeleteVet(req.params.id);
    if (vet) await dbDeleteVet(req.params.id, vet);
    const deletedVet = await dbDeleteVet(req.params.id);
    res.status(200).send(deletedVet);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
