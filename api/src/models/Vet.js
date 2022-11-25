const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Vet",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },

      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: "The name should contain at least 1 letter",
          },
        },
      },

      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: "The lastname should contain at least 1 letter",
          },
        },
      },

      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
        allowNull: false,
      },

      speciality: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      review: {
        type: DataTypes.TEXT,
      },

      average: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: {
          min: 0,
          max: 5,
        },
      },
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
