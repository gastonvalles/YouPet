const { User } = require("../db.js");
const { Op } = require("sequelize");

const userJson = [
  {
    name: "Fernando",
    lastname: "Robledo",
    username: "FerRob",
    password: "robledo1235",
    img: "",
    email: "fernandorobledo3@gmail.com",
    address: "calle falsa 123",
    dni: 35136789,
    isAdmin: false,
    isActive: true,
    tel: 2610094318
  },
  {
    name: "German",
    lastname: "Sosa",
    username: "gsosa97",
    password: "kajlskdja12312",
    img: "",
    email: "german97sosa@gmail.com",
    address: "san juan 1511",
    dni: 40558498,
    isAdmin: false,
    isActive: true,
    tel: 2619994218
  },
  {
    name: "Florencia",
    lastname: "Matiazzo",
    username: "flormat1azzo",
    password: "shifu12321",
    img: "",
    email: "maydamatiazzo@gmail.com",
    address: "calle falsa 124",
    dni: 30888432,
    isAdmin: false,
    isActive: true,
    tel: 2619994398
  },
  {
    name: "Martin",
    lastname: "Llobell",
    username: "tinchollobellxd",
    password: "kasdasd431",
    img: "",
    email: "matinchollobell2@gmail.com",
    address: "calle real 123",
    dni: 30497442,
    isAdmin: false,
    isActive: false,
    tel: 2616694318
  },
  {
    name: "Lautaro",
    lastname: "Fernandez",
    username: "triand98",
    password: "kajlskdjasda2312",
    img: "",
    email: "lautafernan98@gmail.com",
    address: "calle dudosa 123",
    dni: 38456098,
    isAdmin: false,
    isActive: false,
    tel: 2611234318
  },
  {
    name: "Chiara",
    lastname: "Amejeiras",
    username: "pimpirily",
    password: "kajlskdja123das",
    img: "",
    email: "kiaramejeiras@gmail.com",
    address: "calle dudosa 456",
    dni: 41123123,
    isAdmin: false,
    isActive: true,
    tel: 2619935118
  },
  {
    name: "Kevin",
    lastname: "Sfeur",
    username: "kevoohxx",
    password: "kajlskdja1kelvo2",
    img: "",
    email: "kevsfeur@gmail.com",
    address: "calle real 987",
    dni: 40558555,
    isAdmin: false,
    isActive: true,
    tel: 2612094318
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

const getUserByEmail = async (email) => {
  if (email) {
    let user = await User.findOne({
      where: {
        email,
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

const deleteUser = async (id) => {
  await User.destroy({
    where: { id },
  });
  return `User id:${id} deleted sucessfully`;
};


async function editUser(id, data){
  try{
      let user = await User.findByPk(Number(id));
      await user.update(data);
      await user.save();
  }catch(error){
    console.log(error)
      throw new Error("El elemento a editar no existe o los parámetros no son válidos");
  }
}

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
  getUserByEmail,
  deleteUser,
  editUser
  //getUserByUsername
};
