const { Router } = require("express");
const {
    dbCreateTurn
} = require("../controllers/postTurn");

const router = Router();

router.post("/", async (req, res) => {
    try {
      console.log(req.body);
      const createTurn = await dbCreateTurn(req.body);
      res.status(200).json(createTurn);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  module.exports = router;