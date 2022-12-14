const { Router } = require("express");
const { dbCreateTurn } = require("../controllers/postTurn");
const {
  getTurnByVetPK,
  getTurnForVet,
  getUserTurnByPK,
  deleteTurnByPK
} = require("../controllers/getTurn")
const router = Router();

router.post("/", async (req, res) => {
  try {
    console.log(req.user);
    const createTurn = await dbCreateTurn(req.body);
    res.status(200).json(createTurn);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/vet/:vetId", async (req, res) => {
  try {
    console.log(req.params);
    const getTurn = await getTurnForVet(req.params);
    res.status(200).json(getTurn);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/user/:id", async (req, res) => {
  console.log("pasa por aqui")
  try {
    const getUserTurn = await getUserTurnByPK(req.params);
    res.status(200).json(getUserTurn);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:vetId/:servId", async (req, res) => {
  try {
    const getTurn = await getTurnByVetPK(req.params);
    res.status(200).json(getTurn);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedTurn = await deleteTurnByPK(req.params);
    res.status(200).json(deletedTurn);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
