const { Sequelize } = require("sequelize");
const { Op } = require("sequelize");
const { Vet } = require("../db");

const JsonVet = [
  {
    name: "Federico",
    lastname: "Saffores",
    isActive: true,
    speciality: "Clinic",
    review: "",
    average: 0,
  },
  {
    name: "Gaston",
    lastname: "Valles",
    isActive: true,
    speciality: "Anesthesia",
    review: "",
    average: 0,
  },
  {
    name: "Vero",
    lastname: "Mosquera",
    isActive: true,
    speciality: "Diagnostics",
    review: "",
    average: 0,
  },
  {
    name: "Kelvin",
    lastname: "Reyes",
    isActive: true,
    speciality: "Aesthetics",
    review: "",
    average: 0,
  },
];
const getDBVet = async (name) => {
  if ((await Vet.count()) === 0) {
    await Vet.bulkCreate(JsonVet);
  }
  if (!name) {
    return await Vet.findAll({});
  } else {
    return await Vet.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
};

const getDBVetByPK = async (id) => {
  if (id) {
    let vet = await Vet.findOne({
      where: {
        id,
      },
    });
    if (!vet) {
      throw new Error("vet not found");
    }
    return vet;
  } else {
    throw new Error("missing Id");
  }
};
const dbCreateVet = async (body) => {
  try {
    const { name, lastname, isActive, speciality, review, average } = body;
    console.log(name, lastname, isActive, speciality, review, average);
    if (!name || !lastname || !isActive || !speciality || review || average) {
      throw new Error("missing query");
    } else {
      await Vet.create(body);
      return `admin ${body.name} created successfully`;
    }
  } catch (error) {
    throw error;
  }
};
const dbDeleteVet = async (id) => {
  await Vet.destroy({
    where: { id },
  });
  return `vet id:${id} deleted sucessfully`;
};

module.exports = {
  getDBVet,
  getDBVetByPK,
  dbCreateVet,
  dbDeleteVet,
};
