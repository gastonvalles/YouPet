const { Sequelize } = require("sequelize");
const { Turn } = require("../db");
const { Op } = require("sequelize");

const getAllTurn = async () => {
  if ((await Turn.count()) === 0) {
    await Turn.bulkCreate();
  }
};
