const { Sequelize } = require("sequelize");
const {Payments} = require("../db");

const getPayment = async (idPreference) => {
    const paidDB = await Payments.findOne({
        where: { idPreference:idPreference },
    });
    console.log("lo encontre ",paidDB);
    return paidDB
}

module.exports = {
    getPayment
}