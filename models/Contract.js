const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const Contract = sequelize.define("Contract", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    clientName: {
        type: DataTypes.STRING,
        allowNull: false
    },

    clientEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contractName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contractDescription: {
        type: DataTypes.STRING,
        allowNull: false
    },
    contractStatus: {
        type: DataTypes.ENUM("Draft", "Finalized"),
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    }
});

module.exports = Contract;
