const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Service",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      type: {
        type: DataTypes.ENUM([
          "Healthcare Clinic",
          "Surgery and Anesthesia",
          "Diagnostics",
          "Aesthetics",
        ]),
        defaultValue: "Healthcare Clinic",
        validate: {
          isIn: {
            args: [
              [
                "Healthcare Clinic",
                "Surgery and Anesthesia",
                "Diagnostics",
                "Aesthetics",
              ],
            ],
            msg: "It should be Health or Aesthetics",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        defaultValue: false,
        validate: {
          len: {
            args: [1, 50],
            msg: "The name should contain at least 1 letter",
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      timelapse: {
        type: DataTypes.INTEGER,
        defaultValue: 60,
        validate: {
          min: 60,
          max: 2880,
        },
      },
      detail: {
        type: DataTypes.TEXT,
      }
    },
    {
      timestamps: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
