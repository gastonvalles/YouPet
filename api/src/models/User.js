const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("User", {
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
        lastname: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "The lastname should contain at least 1 letter",
                }
            }
        },
        username: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
            validate: {
                len: {
                    args: [1, 50],
                    msg: "Username should have 8 characters at least"
                },
                //is: /^[0-9a-f]{64}$/i
            }
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: {
                    args: [8, 24],
                    msg: "Password should have 8 characters at least"
                },
                //is: /^[0-9a-f]{64}$/i
            }
        },
        email: {
            type: DataTypes.TEXT,
            unique: true,
            allowNull: false,
            validate: {
                //is: /^[0-9a-f]{64}$/i
            }
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
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        },
        isActive: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
            allowNull: false
        }
    }, {
        timestamps: false,
        createdAt: false,
        updatedAt: false
    })
};
