const { User } = require('../db.js');
const { Op } = require("sequelize");

const userJson = [
    {
        name: "Federico",
        lastname: "Saffores",
        username: "FedeSaffo",
        password: "saffores1235",
        email: "fedesaffo@gmail.com",
        address: "calle falsa 123",
        dni: 35136789,
        isAdmin: true,
        isActive: true
    },
    {
        name: "Gaston",
        lastname: "Valles",
        username: "gastonvalles",
        password: "kajlskdja12312",
        email: "gastonvallesyeou@gmail.com",
        address: "san juan 1511",
        dni: 40558498,
        isAdmin: false,
        isActive: true
    }
]

const getAllUsers = async (name) => {
    if ((await User.count()) === 0) {
        await User.bulkCreate(userJson);
    }
    if (!name) {
        return await User.findAll({});
    } else {
        return await User.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`
                }
            }
        });
    }
};

const getUserByPK = async (id) => {
    if (id) {
        let user = await User.findOne({
            where: {
                id
            }
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user;
    } else {
        throw new Error("User not found");
    }
};

// getUserByUsername = async (username) => {
//     if (username) {
//         let user = await User.findOne({
//             where: {
//                 username: {
//                     [Op.iLike]: `%${username}%`
//                 }
//             }
//         });
//         if (!user) {
//             throw new Error("User not found");
//         }
//     } else {
//         throw new Error("User not found");
//     }
// };

module.exports = { getAllUsers, getUserByPK, getUserByUsername };