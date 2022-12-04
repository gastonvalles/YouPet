const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Vet", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    img: {
      type: DataTypes.STRING,
    },
    speciality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fav: {
      type: DataTypes.STRING
    },
    review: {
      type: DataTypes.TEXT,
    },
    average: {
      type: DataTypes.BIGINT,
      defaultValue: 0,
    },
    email: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dni: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false
    },
    tel: {
      type: DataTypes.BIGINT
    },
    inicialDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    finishDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  }, {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  })
};
