const { Router } = require("express");
const {
  getDBAdmin,
  getDBAdminByPK,
  dbCreateAdmin,
  dbDeleteAdmin
} = require("../controllers/getAllAdmin");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const allAdmin = await getDBAdmin(req.query.name);
    console.log(allAdmin);
    res.status(200).json(allAdmin);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const adminPk = await getDBAdminByPK(id);
    res.status(200).json(adminPk);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

router.post("/create", async (req, res) => {
  try {
    const createAdmin = await dbCreateAdmin(req.body);
    res.status(200).json(createAdmin);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/:AdminId", async (req, res) => {
  try {
    const admin = await dbDeleteAdmin(req.params.AdminId);
    if (admin) await dbDeleteAdmin(req.params.AdminId, admin);
    const deletedAdmin = await dbDeleteAdmin(req.params.AdminId);
    res.status(200).send(deletedAdmin);
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = router;
