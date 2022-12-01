const { Service } = require("../db");
const { Op } = require("sequelize");

const JSONService = [
  {
    type: "Healthcare Clinic",
    name: "Vacunation",
    price: 100,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 8, 13, 30).toISOString(),
    //finishDate: new Date(2022, 12, 8, 14, 30).toISOString(),
  },
  {
    type: "Healthcare Clinic",
    name: "Obstetrics and Reproduction",
    price: 150,
    timelapse: 80,
    //inicialDate: new Date(2023, 1, 12, 13, 30).toISOString(),
    //finishDate: new Date(2023, 1, 12, 14, 50).toISOString(),
  },
  {
    type: "Healthcare Clinic",
    name: "Dermatology",
    price: 110,
    timelapse: 70,
    //inicialDate: new Date(2023, 2, 13, 13, 30).toISOString(),
    //finishDate: new Date(2023, 2, 13, 14, 40).toISOString(),
  },
  {
    type: "Healthcare Clinic",
    name: "Preventive",
    price: 130,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 6, 11, 00).toISOString(),
    //finishDate: new Date(2022, 12, 6, 12, 00).toISOString(),
  },
  {
    type: "Healthcare Clinic",
    name: "Medicine",
    price: 80,
    timelapse: 80,
    //inicialDate: new Date(2022, 12, 6, 10, 00).toISOString(),
    //finishDate: new Date(2022, 12, 6, 11, 20).toISOString(),
  },
  {
    type: "Healthcare Clinic",
    name: "Feline Medicine",
    price: 50,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 6, 9, 00).toISOString(),
    //finishDate: new Date(2022, 12, 6, 10, 00).toISOString(),
  },
  {
    type: "Healthcare Clinic",
    name: "Internal Medicine",
    price: 200,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 6, 8, 00).toISOString(),
    //finishDate: new Date(2022, 12, 6, 9, 00).toISOString(),
  },
  {
    type: "Healthcare Clinic",
    name: "Oftalmology",
    price: 250,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 9, 8, 00).toISOString(),
    //finishDate: new Date(2022, 12, 9, 9, 00).toISOString(),
  },
  {
    type: "Surgery and Anesthesia",
    name: "Soft Tissue Surgery",
    price: 120,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 26, 13, 30).toISOString(),
    //finishDate: new Date(2022, 12, 26, 14, 30).toISOString(),
  },
  {
    type: "Surgery and Anesthesia",
    name: "Laser Surgery",
    price: 250,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 24, 8, 00).toISOString(),
    //finishDate: new Date(2022, 12, 24, 9, 00).toISOString(),
  },
  {
    type: "Diagnostics",
    name: "Laboratory Analysis",
    price: 250,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 24, 9, 00).toISOString(),
    //finishDate: new Date(2022, 12, 24, 10, 00).toISOString(),
  },
  {
    type: "Diagnostics",
    name: "Digital Radiology",
    price: 250,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 24, 10, 00).toISOString(),
    //finishDate: new Date(2022, 12, 24, 11, 00).toISOString(),
  },

  {
    type: "Diagnostics",
    name: "Ultrasound",
    price: 40,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 9, 11, 00).toISOString(),
    //finishDate: new Date(2023, 12, 10, 12, 00).toISOString(),
  },
  {
    type: "Aesthetics",
    name: "Feline and Canine Daycare",
    price: 40,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 9, 16, 00).toISOString(),
    //finishDate: new Date(2022, 12, 9, 17, 00).toISOString(),
  },
  {
    type: "Aesthetics",
    name: "Hairdressing",
    price: 40,
    timelapse: 60,
    //inicialDate: new Date(2022, 12, 9, 17, 00).toISOString(),
    //finishDate: new Date(2023, 12, 9, 18, 00).toISOString(),
  },
];

const getDBService = async (name) => {
  if ((await Service.count()) === 0) {
    await Service.bulkCreate(JSONService);
  }
  if (!name) {
    return await Service.findAll({});
  } else {
    return await Service.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
    });
  }
};

const getDBServiceByPK = async (id) => {
  if (id) {
    let service = await Service.findOne({
      where: {
        id,
      },
    });
    if (!service) {
      throw new Error("service not found");
    }
    return service;
  } else {
    throw new Error("missing serviceId");
  }
};

const dbServiceCreate = async (body) => {
  const { type, name, price, timelapse } = body;
  if (!type || !name || !price || !timelapse) {
    throw new Error("missing params");
  }
  try {
    //const parceDate = new Date(inicialDate).toISOString();
    //console.log(parceDate);
    //if (new Date() > parceDate) throw Error("Fecha en el pasado");
    await Service.create(body);
    return `service ${body.name} created successfully`;
  } catch (error) {
    throw error;
  }
};
const dbDeleteService = async (id) => {
  await Service.destroy({
    where: { id },
  });
  return `service id:${id} deleted sucessfully`;
};

module.exports = {
  getDBService,
  getDBServiceByPK,
  dbServiceCreate,
  dbDeleteService,
};