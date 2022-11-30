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
    inicialDate: new Date(2022, 1, 10, 9, 0, 0),
    finishDate: new Date(2022, 1, 10, 12, 0, 0)
  },
  {
    name: "Gaston",
    lastname: "Valles",
    isActive: true,
    speciality: "Clinic",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 13, 0, 0),
    finishDate: new Date(2022, 1, 10, 18, 0, 0)
  },
  {
    name: "Veronica",
    lastname: "Mosquera",
    isActive: true,
    speciality: "Anesthesia",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 9, 0, 0),
    finishDate: new Date(2022, 1, 10, 11, 0, 0)
  },
  {
    name: "Kelvin",
    lastname: "Reyes",
    isActive: true,
    speciality: "Anesthesia",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 14, 0, 0),
    finishDate: new Date(2022, 1, 10, 18, 0, 0)
  },
  {
    name: "Ernesto",
    lastname: "Velazquez",
    isActive: true,
    speciality: "Diagnostics",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 15, 0, 0),
    finishDate: new Date(2022, 1, 10, 19, 0, 0)
  },
  {
    name: "Pedro",
    lastname: "Gonzalez",
    isActive: true,
    speciality: "Diagnostics",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 13, 0, 0),
    finishDate: new Date(2022, 1, 10, 15, 0, 0)
  },
  {
    name: "Luis",
    lastname: "Goytia",
    isActive: true,
    speciality: "Aesthetics",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 12, 0, 0),
    finishDate: new Date(2022, 1, 10, 19, 0, 0)
  },
  {
    name: "Mathias",
    lastname: "Ledesma",
    isActive: true,
    speciality: "Aesthetics",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 14, 0, 0),
    finishDate: new Date(2022, 1, 10, 18, 0, 0)
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
    const { name, lastname, isActive, speciality, review, average, inicialDate, finishDate } = body;
    console.log(name, lastname, isActive, speciality, review, average, inicialDate, finishDate);
    if (!name || !lastname || !isActive || !speciality || review || average || !inicialDate || !finishDate) {
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
