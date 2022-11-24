const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Score", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER,
            defaultValue: 5,
            validate: {
                min: 1,
                max: 5
            }
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    })
};