const { Router } = require("express");
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
    console.log(allVet);
    res.status(200).json(allVet);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const vetPk = await getDBVetByPK(id);
    res.status(200).json(vetPk);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    //console.log(req.body);
    const createVet = await dbCreateVet(req.body);
    res.status(200).json(createVet);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:vetId", async (req, res) => {
  try {
    const vet = await dbDeleteVet(req.params.vetId);
    if (vet) await dbDeleteVet(req.params.vetId, vet);
    const deletedVet = await dbDeleteVet(req.params.vetId);
    res.status(200).send(deletedVet);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
module.exports = router;
