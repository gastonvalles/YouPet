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
    finishDate: new Date(2022, 1, 10, 12, 0, 0),
    tel: 2615594312,
    dni: 39987470
  },
  {
    name: "Gaston",
    lastname: "Valles",
    isActive: true,
    speciality: "Clinic",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 13, 0, 0),
    finishDate: new Date(2022, 1, 10, 18, 0, 0),
    tel: 2619994713,
    dni: 39987329
  },
  {
    name: "Veronica",
    lastname: "Mosquera",
    isActive: true,
    speciality: "Anesthesia",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 9, 0, 0),
    finishDate: new Date(2022, 1, 10, 11, 0, 0),
    tel: 2612904314,
    dni: 39987915
  },
  {
    name: "Kelvin",
    lastname: "Reyes",
    isActive: true,
    speciality: "Anesthesia",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 14, 0, 0),
    finishDate: new Date(2022, 1, 10, 18, 0, 0),
    tel: 2617774315,
    dni: 39987007
  },
  {
    name: "Ernesto",
    lastname: "Velazquez",
    isActive: true,
    speciality: "Diagnostics",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 15, 0, 0),
    finishDate: new Date(2022, 1, 10, 19, 0, 0),
    tel: 2619004316,
    dni: 39987321
  },
  {
    name: "Pedro",
    lastname: "Gonzalez",
    isActive: true,
    speciality: "Diagnostics",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 13, 0, 0),
    finishDate: new Date(2022, 1, 10, 15, 0, 0),
    tel: 2612294317,
    dni: 39987265
  },
  {
    name: "Luis",
    lastname: "Goytia",
    isActive: true,
    speciality: "Aesthetics",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 12, 0, 0),
    finishDate: new Date(2022, 1, 10, 19, 0, 0),
    tel: 2619394318,
    dni: 39987237
  },
  {
    name: "Mathias",
    lastname: "Ledesma",
    isActive: false,
    speciality: "Aesthetics",
    review: "",
    average: 0,
    inicialDate: new Date(2022, 1, 10, 14, 0, 0),
    finishDate: new Date(2022, 1, 10, 18, 0, 0),
    tel: 2618894319,
    dni: 39987235
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
    const { name, lastname, isActive, speciality, review, average, inicialDate, finishDate, tel } = body;
    console.log(name, lastname, isActive, speciality, review, average, inicialDate, finishDate);
    if (!name || !lastname || !isActive || !speciality || review || average || !inicialDate || !finishDate || !tel) {
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
  return `Vet id:${id} deleted sucessfully`;
};

module.exports = {
  getDBVet,
  getDBVetByPK,
  dbCreateVet,
  dbDeleteVet,
};
