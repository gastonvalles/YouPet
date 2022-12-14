const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("Turn", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        timelapse: {
            type: DataTypes.INTEGER,
            defaultValue: 60,
            validate: {
                min: 60,
                max: 2880
            }
        },
        globalprice: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            },

        inicialDate: {
                type: DataTypes.DATE,
                allowNull: false
             },
             
       finishDate: {
                type: DataTypes.DATE,
                allowNull: false
             },    
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    })
};