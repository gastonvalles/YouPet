const { Router } = require("express");
const {
  getDBAdmin,
  getDBAdminByPK,
  deleteAdmin,
  getAdminByEmail
} = require("../controllers/getAllAdmin");
const router = Router();

router.get("/myadmin", async (req, res) => {
  if (req.admin) {
    return res.status(200).send(req.admin);
  }
  return res.status(404).send("No esta logueado");
});

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

router.get("/log/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const adminId = await getAdminByEmail(email);
    res.status(200).send(adminId);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const admin = await deleteAdmin(req.params.id);
    if (admin) await deleteAdmin(req.params.id, admin);
    const deletedAdmin = await deleteAdmin(req.params.id);
    res.status(200).send(deletedAdmin);
  } catch (error) {
    res.send(error.message);
  }
});

module.exports = router;
