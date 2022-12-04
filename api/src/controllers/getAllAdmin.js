const { Admin } = require("../db");
const { Op } = require("sequelize");

const FirstAdmin = [
  {
    name: "Federico",
    lastname: "Saffores",
    username: "AppFede",
    password: "12345678",
    tel: 2613994310,
    img: "",
    dni: 35987456,
    email: "fedesaffores@gmail.com",
    address: "alberdi 123",
    isAdmin: true,
    isActive: true
  },
  {
    name: "Gaston",
    lastname: "Valles",
    username: "AppGas",
    password: "12345",
    tel: 2619584318,
    img: "",
    dni: 40558498,
    email: "gastonvallesyeou@gmail.com",
    address: "san juan 1511",
    isAdmin: true,
    isActive: true
  },
  {
    name: "Luis",
    lastname: "Goytia",
    username: "AppLuis",
    password: "12345",
    tel: 2619694318,
    img: "",
    dni: 41987456,
    email: "luisgoytia@gmail.com",
    address: "calle falsa 123",
    isAdmin: true,
    isActive: false
  },
  {
    name: "Ernesto",
    lastname: "Velazquez",
    username: "AppErnesto",
    password: "123456",
    tel: 2619994318,
    img: "",
    dni: 32987456,
    email: "ernestovvelazquez@gmail.com",
    address: "calle real 321",
    isAdmin: true,
    isActive: true
  }
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
      throw new Error("Admin not found");
    }
    return admin;
  } else {
    throw new Error("missing Id");
  }
};

const dbCreateAdmin = async (body) => {
  try {
    const { name, lastname, username, password, email, address, tel, img, dni, isAdmin, isActive } = body;
    if (!name && !lastname && !username && !password && !tel && !dni && !isAdmin && !isActive && !email && !address) {
      throw new Error("Missing params");
    } else {
      await Admin.create(body);
      return `Admin ${body.name} created successfully`;
    }
  } catch (error) {
    throw error;
  }
};

const deleteAdmin = async (id) => {
  await Admin.destroy({
    where: { id },
  });
  return `Admin id:${id} deleted sucessfully`;
};

module.exports = {
  getDBAdmin,
  getDBAdminByPK,
  dbCreateAdmin,
  deleteAdmin
};
