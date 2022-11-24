const { Sequelize } = require("sequelize");
const { Service } = require("../db");
const { Op } = require("sequelize");

const JSONService = [
  {
    type: "Health",
    name: "Vacunacion",
    price: 100,
    timelapse: 60,
    inicialDate: new Date(2022, 12, 8, 13, 30).toISOString(),
    finishDate: new Date(2022, 12, 8, 14, 30).toISOString(),
  },
  {
    type: "Aesthetics",
    name: "Corte de Pelo",
    price: 25,
    timelapse: 60,
    inicialDate: new Date(2022, 12, 8, 15, 00, 12).toISOString(),
    finishDate: new Date(2022, 12, 8, 16, 00, 12).toISOString(),
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

{
  /*const dbServiceCreate = async (body) => {
  const { type, name, price, timelapse, date } = body;
  if (!type || !name || !price || !timelapse || !inicialDate || !finishDate) {
    throw new Error("missing params");
  }
  try {
    const parceDate = new Date(date);
    if (new Date() > parceDate) throw Error("Fecha en el pasado");
    await Service.create(body);
    return `service ${body.name} created successfully`;
  } catch (error) {
    throw error;
  }
};
*/
}
{
  /*const dbDeleteService = async (id) => {
  await Service.destroy({
    where: { id },
  });
  return `service id:${id} deleted sucessfully`;
};
*/
}
module.exports = {
  getDBService,
  getDBServiceByPK,
  //dbServiceCreate,
  //dbDeleteService,
};
