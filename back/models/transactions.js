const Sequelize = require("sequelize");
const database = require("../database/sequelize");

const Transactions = database.define(
  "transactions",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    typeBalance: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    value: {
      type: Sequelize.DECIMAL(15,2),
      allowNull: false,
    },
    createdat: {
      type: Sequelize.DATEONLY,
      defaultValue: Sequelize.NOW,
    },
  },
  {
    timestamps: false,
  }
);

module.exports = Transactions;
