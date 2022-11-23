const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Service", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("Health", "Aesthetics"),
            defaultValue: "Health",
            validate: {
                isIn: {
                    args: ["Health", "Aesthetics"],
                    msg: "It should be Health or Aesthetics",
                }
            }
        },
        price: {
            type: DataTypes.NUMBER,
            defaultValue: 0,
        },
        timelapse: {
            type: DataTypes.INTEGER,
            defaultValue: 10,
            validate: {
                min: 60,
                max: 2880
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        review: {
            type: DataTypes.TEXT
        },
        average: {
            type: DataTypes.NUMBER,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5
            }
        }
    }, {
        timestamps: false,
        createdAt: null,
        updatedAt: null
    })
};