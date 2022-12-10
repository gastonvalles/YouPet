const { Router } = require("express");
const { Favoritos, Vet, User } = require("../db");

//const {} = require();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const usuario = await User.findOne({
      where: { id: req.user.id },
      include: Favoritos,
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const favoritos = await Favoritos.findOne({
      where: {
        UserId: req.user.id,
        VetId: id,
      },
      include: [User, Vet],
    });
    res.status(200).json(favoritos);
  } catch (error) {
    res.status(404).send(error);
  }
});

router.post("/:id", async (req, res) => {
  try {
    const favoritos = await Favoritos.findOne({
      where: {
        UserId: req.user.id,
        VetId: id,
      },
    });
    if (favoritos) {
      await Favoritos.destroy({
        where: {
          UserId: req.user.id,
          VetId: id,
        },
      });
      return res.status(200).json({ favorite: false });
    }
    await Favoritos.create({
      UserId: req.user.id,
      VetId: id,
    });
    return res.status(200).json({ favorite: true });
  } catch (error) {
    res.status(404).send(error);
  }
});
module.exports = router;
