const { Router } = require("express");
const { dbCreateTurn } = require("../controllers/postTurn");
const { getTurnByVetPK, getTurnForVet } = require("../controllers/getTurn");

const router = Router();

router.post("/", async (req, res) => {
  try {
    const createTurn = await dbCreateTurn(req.body);
    res.status(200).json(createTurn);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;

router.get("/vet/:vetId", async (req, res) => {
  try {
    const getTurn = await getTurnForVet(req.params);
    res.status(200).json(getTurn);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:vetId/:servId", async (req, res) => {
  try {
    console.log(req.user);
    const getTurn = await getTurnByVetPK(req.params);
    res.status(200).json(getTurn);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
