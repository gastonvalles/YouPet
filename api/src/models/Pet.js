const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Pet", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "The name should contain at least 1 letter",
                }
            }
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        detail: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    })
};
