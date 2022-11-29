const Sequelize = require('sequelize');
const database = require('../database/sequelize');

const Accounts = database.define('accounts',{
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  balance: {
    type: Sequelize.DECIMAL,
    allowNull: false
  }
}, {
  timestamps: false
})

module.exports = Accounts
