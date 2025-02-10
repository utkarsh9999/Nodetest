const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Contract = sequelize.define("Contract", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    file_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    file_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contract_status: {
        type: DataTypes.JSONB, // Stores JSON data
        allowNull: false,
    }
}, {
    tableName: "Contract",
    timestamps: true,
});

module.exports = Contract;
