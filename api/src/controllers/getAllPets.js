const { Pet } = require('../db.js');
const { Op } = require("sequelize");

const petJson = [
    {
        name: "Yomo",
        detail: "Pitbull Terrier, 30kg, 2 years old",
        date: new Date(2020, 8, 4).toISOString()
    },
    {
        name: "Tuca",
        detail: "Turkish Angora, 5kg",
        date: new Date(2020, 10, 15).toISOString()
    }
]

const getAllPets = async (name) => {
    if ((await Pet.count()) === 0) {
        await Pet.bulkCreate(petJson);
    }
    if (!name) {
        return await Pet.findAll({});
    } else {
        return await Pet.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
    }
};

const getPetByPK = async (id) => {
    if (id) {
        let pet = await Pet.findOne({
            where: {
                id
            }
        });
        if (!pet) {
            throw new Error("Pet not found");
        }
        return pet;
    } else {
        throw new Error("Pet not found");
    }
};

// const getByPetOwner = async (UserId) => {
//     const petOwner = await Pet.findAll({
//         where: {
//             UserId: {
//                 [Op.iLike]: `%${UserId}%`
//             }
//         }
//     })
//     if (!petOwner) {
//         throw new Error(" Pet not found");
//     } else {
//         return petOwner;
//     }
// };

module.exports = { getAllPets, getPetByPK };