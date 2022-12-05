const { Sequelize } = require("sequelize");
const { Turn, Vet, Service } = require("../db");

const getTurnByVetPK = async ({ vetId, servId }) => {
  if (vetId && servId) {
    let turn = await Turn.findAll({
      where: {
        VetId: vetId,
      },
      order: [["inicialDate", "ASC"]],
    });

    let vet = await Vet.findOne({
      where: {
        id: vetId,
      },
    });

    let service = await Service.findOne({
      where: {
        id: servId,
      },
    });

    if (!vet || !service) {
      throw new Error(" Vet or service not found");
    }
    return {
      turn,
      vet,
      service,
    };
  } else {
    throw new Error("Turns not found");
  }
};

const getTurnForVet = async ({ vetId, servId }) => {
  if (vetId) {
    let turn = await Turn.findAll({
      where: {
        VetId: vetId,
      },

      order: [["inicialDate", "ASC"]],
    });

    return turn;
  } else {
    throw new Error("Turns not found");
  }
};

const getAllTurns = async () => {
  let turn = await Turn.findAll({
    include: [
      {
        model: Vet,
        attributes: ["name", "lastname"],
      },
      {
        model: Service,
        attributes: ["name"],
      },
    ],
  });
  if (turn.length) {
    return turn;
  } else {
    throw new Error("Turns not found");
  }
};

module.exports = {
  getAllTurns,
  getTurnByVetPK,
  getTurnForVet,
};
