const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Admin",
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
      username: {
        type: DataTypes.TEXT,
        unique: true,
        allowNull: false,
        validate: {
          len: {
            args: [1, 50],
            msg: "Username should have 8 characters at least",
          },
        },
      },
      password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          len: {
            args: [8, 24],
            msg: "Password should have 8 characters at least",
          },
        },
      },
      img: {
        type: DataTypes.STRING,
      },
      tel: {
        type: DataTypes.BIGINT
      },
      dni: {
        type: DataTypes.INTEGER,
        unique: true,
        allowNull: false
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
      }
    },
    {
      timestamp: false,
      createdAt: false,
      updatedAt: false,
    }
  );
};
