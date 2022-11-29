const models = require("../models/index");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const userController = {
  getAllTransactions: async (req, res) => {
    const tableTransf = await models.Transactions.findAll({
      where: {
        [Op.or]: [
          { creditedAccountId: req.user.id },
          { debitedAccountId: req.user.id },
        ],
      },
    });
 
    res.send({userData: tableTransf, userId: req.user.id});

    //     const project = await Project.findByPk(123);
    // if (project === null) {
    //   console.log('Not found!');
    // } else {
    //   console.log(project instanceof Project); // true
    //   // Its primary key is 123
    // }
  },
  // getMapTransactions: (req, res) => {
  //   res.send("all user routes 2")
  // },
  postTransactions: async (req, res) => {
    let token = req.body.token;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decoded);

    let creditId;
    let debitId;

    if (req.body.typeBalance === "deposito") {
      creditId = decoded.id;
      debitId = null;
    } else if (req.body.typeBalance === "saque") {
      creditId = null;
      debitId = decoded.id;
    } else if (req.body.typeBalance === "transferencia") {
      const userTransf = await models.Users.findOne({
        where: { username: req.body.title },
      });

      if (userTransf === null) {
        console.log("Not found!");
      } else {
        creditId = userTransf.dataValues.id;
        debitId = decoded.id;
      }
    }
    models.Transactions.create({
      title: req.body.title,
      typeBalance: req.body.typeBalance,
      value: req.body.value,
      debitedAccountId: debitId,
      creditedAccountId: creditId,
    });
    res.status(200).json({msg: "Criado com sucesso!"});
  },
};

module.exports = userController;
