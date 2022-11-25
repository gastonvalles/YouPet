const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("MedicalDiagnostic", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        detail: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    })
};