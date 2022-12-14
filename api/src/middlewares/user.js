const { Router } = require("express");
const {
  getAllUsers,
  getUserByPK,
  getUserByEmail,
  deleteUser,
} = require("../controllers/getAllUsers");
const router = Router();

router.get("/myuser", async (req, res) => {
  if (req.user) {
    return res.status(200).send(req.user);
  }
  return res.status(404).send("No esta logueado");
});

router.get("/", async (req, res) => {
  try {
    const user = await getAllUsers(req.query.name);
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = await getUserByPK(id);
    res.status(200).send(userId);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/log/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const userId = await getUserByEmail(email);
    res.status(200).send(userId);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.delete("/delete", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).json({ msg: `User id: ${id} deleted successfully` });
  } catch (error) {
    res.status(404).send(error);
  }
});


router.put('/:id', async (req, res)=>{
  const data = req.body;
  const {id: id} = req.params; 
  try{
      await editUser(id, data);
      res.send("La reserva se edito exitosamente");
  }catch(error){
      res.status(404).send(error.message)
  }
});

module.exports = router;
