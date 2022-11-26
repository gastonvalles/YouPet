const { Admin } = require("../db");
const { Op } = require("sequelize");

const FirstAdmin = [
  {
    name: "Federico",
    lastname: "Saffores",
    adminame: "AppName",
    password: "12345678",
  },
  {
    name: "Gaston",
    lastname: "Valles",
    adminame: "AppGas",
    password: "12345",
  },
  {
    name: "Luis",
    lastname: "xxx",
    adminame: "Luisxxx",
    password: "12345",
  },
];

const getDBAdmin = async (name) => {
  if ((await Admin.count()) === 0) {
    await Admin.bulkCreate(FirstAdmin);
  }
  if (!name) {
    return await Admin.findAll({});
  } else {
    return await Admin.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
};

const getDBAdminByPK = async (id) => {
  if (id) {
    let admin = await Admin.findOne({
      where: {
        id,
      },
    });
    if (!admin) {
      throw new Error("admin not found");
    }
    return admin;
  } else {
    throw new Error("missing Id");
  }
};

const dbCreate = async (body) => {
  const { name, lastname, adminame, password } = body;
  if (name && lastname && adminame && password) {
    await Admin.create(body);
    return `Admin ${body.name} created successfully`;
  } else {
    throw new Error("Missing Data");
  }
};

// const getAdminByName = async (name) => {
//   const admin = await User.findAll({
//     where: {
//       name: {
//         [Op.iLike]: `%${name}%`,
//       },
//     },
//   });
//   return admin;
// };

module.exports = {
  getDBAdmin,
  getDBAdminByPK,
  dbCreate,
};
