const fs = require("fs");
const models = {};

fs.readdirSync(__dirname)
  .filter((file) => file.indexOf(".") !== 0 && file !== "index.js")
  .forEach((file) => {
    let model = require("./" + file);
    let name = file[0].toUpperCase() + file.substr(1).slice(0, -3);
    models[name] = model;
  });

models.Accounts.hasOne(models.Users, {
  foreignKey: "accountid",
  as: "usersdb",
});

models.Accounts.hasOne(models.Transactions, {
  foreignKey: "debitedAccountId",
  as: "debited",
});

models.Accounts.hasOne(models.Transactions, {
  foreignKey: "creditedAccountId",
  as: "credited",
});

module.exports = models;
