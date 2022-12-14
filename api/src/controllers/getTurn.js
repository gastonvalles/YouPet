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
const getUserTurnByPK = async ({ id }) => {
  
  if (id) {
    let userTurn = await Turn.findAll({
      where: {
        UserId: id,
      },
      include: [{
        model: Vet,
        attributes:['name', 'lastname']
      }, {
        model: Service,
        attributes:['name']
      }],

      order: [["inicialDate", "DESC"]],
    });

    return userTurn;

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


const deleteTurnByPK = async (params) => {
  const {id} = params;
const deletedTurn = await Turn.destroy({
  where: {
    id: id
  },
});
if (!deletedTurn) {
  throw new Error(" Pet not found");
} else {
  return deletedTurn;
}
};

module.exports = {
  deleteTurnByPK,
  getUserTurnByPK,
  getAllTurns,
  getTurnByVetPK,
  getTurnForVet,
};
