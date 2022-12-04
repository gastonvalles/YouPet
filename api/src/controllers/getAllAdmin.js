const { Admin } = require("../db");
const { Op } = require("sequelize");

const FirstAdmin = [
  {
    name: "Federico",
    lastname: "Saffores",
    adminame: "AppFede",
    password: "12345678",
    tel: 2613994310,
    img: "",
    dni: 35987456,
    isAdmin: true,
    isActive: true
  },
  {
    name: "Gaston",
    lastname: "Valles",
    adminame: "AppGas",
    password: "12345",
    tel: 2619584318,
    img: "",
    dni: 40558498,
    isAdmin: true,
    isActive: true
  },
  {
    name: "Luis",
    lastname: "Goytia",
    adminame: "AppLuis",
    password: "12345",
    tel: 2619694318,
    img: "",
    dni: 41987456,
    isAdmin: true,
    isActive: false
  },
  {
    name: "Ernesto",
    lastname: "Velazquez",
    adminame: "AppErnesto",
    password: "123456",
    tel: 2619994318,
    img: "",
    dni: 32987456,
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
    const { name, lastname, adminame, password, tel, img, dni, isAdmin, isActive } = body;
    if (!name || !lastname || !adminame || !password || !tel || !dni || !isAdmin || !isActive) {
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
};
