const { Pet } = require('../models/Pet.js');

const petJson = [
    {
        name: "Yomo",
        detail: "Pitbull Terrier, 30kg, 2 years old",
        date: ""
    },
    {
        name: "Tuca",
        detail: "Turkish Angora, 5kg, 2 years old",
        date: ""
    }
]

const getAllPets = async () => {
    let db = await Pet.findAll({
        // include: [
        //     {
        //         model:
        //     }
        // ],
        // order: [
        //     ['id', 'ASC']
        // ]
    })
    if (!db.length) {
        await Pet.bulkCreate(petJson);
    }
    return db;
};

const getPetByPK = async (id) => {
    if (!id) {
        throw new Error("Pet not found")
    } else {
        let db = await Pet.findOne({
            where: {
                id
            }
        })
        if (!db.length) {
            throw new Error("Pet not found");
        }
        return db;
    }
};

const getPetByName = async (name) => {
    let pets = await Pet.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    })
    return pets;
};

module.exports = { getAllPets, getPetByName, getPetByPK };