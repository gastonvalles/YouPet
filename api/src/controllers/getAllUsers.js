const { User } = require("../db.js");
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
    },
    {
        name: "Veronica",
        lastname: "Mosquera",
        username: "vemodi",
        password: "vemodi1234",
        email: "vemodi@gmail.com",
        address: "calle falsa 124",
        dni: 30888432,
        isAdmin: false,
        isActive: true
    },
    {
        name: "Ernesto",
        lastname: "Velazquez",
        username: "ernestovv",
        password: "kasdasd431",
        email: "ernestovelzquezx2@gmail.com",
        address: "calle real 123",
        dni: 30497442,
        isAdmin: false,
        isActive: false
    },
    {
        name: "Pedro",
        lastname: "Gonzalez",
        username: "pdg94xd",
        password: "kajlskdjasda2312",
        email: "pedrodavidgonzalez@gmail.com",
        address: "calle dudosa 123",
        dni: 38456098,
        isAdmin: true,
        isActive: false
    },
    {
        name: "Luis",
        lastname: "Goytia",
        username: "luisgoytiacabezas",
        password: "kajlskdja123das",
        email: "luisgoytia@gmail.com",
        address: "calle dudosa 456",
        dni: 41123123,
        isAdmin: false,
        isActive: true
    },
    {
        name: "Kelvin",
        lastname: "Reyes",
        username: "klevensrey",
        password: "kajlskdja1kelvo2",
        email: "kelvinreyesramirez@gmail.com",
        address: "calle real 987",
        dni: 40558555,
        isAdmin: true,
        isActive: true
    }
];

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
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
};

const getUserByPK = async (id) => {
  if (id) {
    let user = await User.findOne({
      where: {
        id,
      },
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

module.exports = {
  getAllUsers,
  getUserByPK,
  //getUserByUsername
};
