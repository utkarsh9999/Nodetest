const { DataTypes } = require("sequelize");
const sequelize = require("../database/database");

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    age: {
        type: DataTypes.INTEGER
    }
}, {
    timestamps: true // Adds createdAt & updatedAt
});

module.exports = User;
