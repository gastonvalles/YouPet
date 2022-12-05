const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Payments", {
        idPaid: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        idPreference: {
            type: DataTypes.STRING,
            allowNull: false
            },
        idUserMP: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status:{
            type: DataTypes.STRING,
            allowNull: false
        },
        orderStatus: {
            type: DataTypes.STRING,
            allowNull: false
        },
        
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    })
};