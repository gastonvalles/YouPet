const { Sequelize } = require("sequelize");
const { Turn } = require("../db");


  const dbCreateTurn = async (body) => {
    try {
      const {  globalprice, inicialDate, finishDate } = body;
      console.log( globalprice, inicialDate, finishDate );
      if (!globalprice||!inicialDate ||!finishDate) {
        throw new Error("missing query");
      } else {
        await Turn.create(body);
        return "turn created successfully";
      }
    } catch (error) {
      throw error;
    }
  };

  module.exports = {
    dbCreateTurn
  };