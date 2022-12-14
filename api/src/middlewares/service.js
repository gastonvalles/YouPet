const { Router } = require("express");
const {
  getDBService,
  getDBServiceByPK,
  dbServiceCreate,
  dbDeleteService,
} = require("../controllers/getAllService");
//falta la ruta del put
const router = Router();

router.get("/", async (req, res) => {
  try {
    const allService = await getDBService(req.query.name);
    //console.log(allService);
    res.status(200).json(allService);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const service = await getDBServiceByPK(id);
    res.status(200).json(service);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/", async (req, res) => {
  try {
    const createService = await dbServiceCreate(req.body);
    res.status(200).json(createService);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const service = await dbDeleteService(req.params.id);
    if (service) await dbDeleteService(req.params.id, service);
    const deletedService = await dbDeleteService(req.params.id);
    res.status(200).send(deletedService);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
