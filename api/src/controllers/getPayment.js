const { Sequelize } = require("sequelize");
const Payments = require("../db");

const getPayment = async (idPreference) => {
    console.log(idPreference);
    const paidDB = await Payments.findAll({
        where: { idPreference:idPreference },
    });
    console.log("lo encontre ",paidDB);
    return paidDB
}

module.exports = {
    getPayment
}