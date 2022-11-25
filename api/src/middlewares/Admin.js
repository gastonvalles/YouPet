const { Router } = require("express");
const {
  getDBAdmin,
  getDBAdminByPK,
  getAdminByName,
  dbCreate,
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
router.get("/", async (req, res) => {
  try {
    const allAdmin = await getAdminByName(req.query.name);
    res.status(200).json(allAdmin);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
{
  /* router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    const createAdmin = await dbCreate(req.body);

    res.status(200).json(createAdmin);
  } catch (error) {
    res.status(404).send(error.message);
  }
});
*/
}
module.exports = router;
