const { Router } = require("express");
const {
  getDBAdmin,
  getDBAdminByPK,
  dbCreateAdmin,
  createAdmin,
  loginAdmin,
  verifyAdmin,
  deleteAdmin
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

router.post("/", async (req, res) => {
  try {
    const createAdmin = await dbCreateAdmin(req.body);
    res.status(200).json(createAdmin);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/", createAdmin);
router.post("/loginadmin", loginAdmin);
router.get("/login/:confirmationCode", verifyAdmin);

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteAdmin(id);
    res.status(200).json({ msg: `Admin id: ${id} deleted successfully` });
  } catch (error) {
    res.status(404).send(error);
  }
});

module.exports = router;
