const { Router } = require("express");
const {
    dbCreateUser
} = require("../controllers/postUser");

const router = Router();

router.post("/", async (req, res) => {
    try {
      console.log(req.body);
      const createUser = await dbCreateUser(req.body);
      res.status(200).json(createUser);
    } catch (error) {
      res.status(404).send(error.message);
    }
  });

  module.exports = router;