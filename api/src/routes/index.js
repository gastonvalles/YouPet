
const { Sequelize } = require("sequelize");
const { Router, json } = require("express");
const router = Router();
router.use(json());
const serviceController = require("../middlewares/service");
const admController = require("../middlewares/admin");
const petController = require("../middlewares/pet");
const vetController = require("../middlewares/vet");
const turnController = require("../middlewares/turn.js")
const userController = require("../middlewares/user.js")

const { Admin, Vet, User } = require("../db");

router.use("/admin", admController);
router.use("/service", serviceController);
router.use("/pet", petController);
router.use("/vet", vetController);
router.use("/turn", turnController);
router.use("/user", userController);




async function adminactualizado(req, res, next) {
    const { id } = req.params
    const { name, lastname, adminame, password, img }= req.body
   
    try {
        admin = await Admin.findByPk(id)
        admin.name = name
        admin.lastname = lastname
        admin.adminame = adminame
        admin.password = password
        admin.img=img
        
        await admin.save()
        res.send('adminactualizado')
    } catch (error) {
        next(error)
    }
}


async function vetactualizado(req, res, next) {
    const { id } = req.params
    const { name, lastname, isActive, speciality, review, average, inicialDate, finishDate } = req.body
   
    try {
        vet = await Vet.findByPk(id)
        vet.name = name
        vet.lastname = lastname
        vet.isActive = isActive
        vet.speciality = speciality
        vet.review= review
        vet.average= average
        vet.inicialDate=inicialDate
        vet.finishDate=finishDate
        
        await vet.save()
        res.send('Veterinario actualizado')
    } catch (error) {
        next(error)
    }
}


async function userctualizado(req, res, next) {
    const { id } = req.params
    const {  name, lastname, username, password, confirmationpass, email, address, dni,isAdmin, isActive } = req.body
   
    try {
        user = await User.findByPk(id)
        user.name = name
        user.lastname = lastname
        user.username = username
        user.password = password
        user.confirmationpass= confirmationpass
        user.email= email
        user.address=address
        user.dni=dni
        user.isAdmin=isAdmin
        user.isActive=isActive
        
        await user.save()
        res.send('usuario actualizado')
    } catch (error) {
        next(error)
    }
}


router.put('/admin/:id', adminactualizado)
router.put('/vet/:id', vetactualizado)
router.put('/user/:id', userctualizado)



module.exports = router;
