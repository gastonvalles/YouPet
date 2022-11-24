const { User } = require('../models/User.js');

const userJson = [
    {
        name: "Federico",
        lastname: "Saffores",
        username: "FedeSaffo",
        password: "saffores1235",
        email: "fedesaffo@gmail.com",
        address: "calle falsa 123",
        dni: 25136789,
        isAdmin: true,
        isActive: true
    },
    {
        name: "Gaston",
        lastname: "Valles",
        username: "gastonvalles",
        password: "kajlskdja12312",
        email: "gastonvallesyeou@gmail.com",
        address: "calle falsa 123",
        dni: 25136789,
        isAdmin: true,
        isActive: true
    }
]

const getAllUsers = async () => {
    let db = await User.findAll({
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
        await User.bulkCreate(userJson, { validate: true });
    }
    return db;
};

const getUserByPK = async (id) => {
    if (!id) {
        throw new Error("User not found")
    } else {
        let db = await User.findOne({
            where: {
                id
            }
        })
        if (!db.length) {
            throw new Error("User not found");
        }
        return db;
    }
};

const getUserByName = async (name) => {
    let users = await User.findAll({
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    })
    return users;
};

module.exports = { getAllUsers, getUserByPK, getUserByName }