const Sequelize = require("sequelize");
const database = require("../database/sequelize");

const Users = database.define("users", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
}, {
  timestamps: false
});

module.exports = Users;
