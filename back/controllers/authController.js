const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("jsonwebtoken");
const models = require("../models/index");
const dbConnection = require("../database/sequelize");

const handle = (promise) => {
  return promise.then((data) => [data]).catch((err) => Promise.resolve([err]));
};

const Creator = models.Accounts.hasOne(models.Users, {
  as: "user",
  foreignKey: "accountid",
});

const authController = {

  register: (req, res) => {
    if (dbConnection.error) {
      res.status(500).json({ err: `There was an error ${err}` });
    } else {
      if (
        req.body.values.userName === "" ||
        req.body.values.password === "" ||
        req.body.values.confirmPassword === ""
      ) {
        res.status(403).json({ err: `There was an error` });
      } else {
        let hash = bcrypt.hashSync(req.body.values.password, saltRounds);

        models.Accounts.create(
          {
            balance: 0,
            user: {
              username: req.body.values.userName,
              password: hash,
            },
          },
          {
            include: [Creator],
          }
        )
          .then(() => {
            res.status(201).json({ message: "Successfully Registered" });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({ err: `There was an error ${err}` });
          });
      }
    }
  },
  login: async (req, res) => {

    if (!req.body.user || !req.body.pwd)
      return res
        .status(400)
        .json({ message: "Username and password are required." });

    const [user] = await handle(
      models.Users.findOne({
        where: { username: req.body.user },
      })
    );

    let password = req.body.pwd;
    let userHash = user.dataValues.password;

    const match = await bcrypt.compare(password, userHash);

    if (match) {
      let payload = { id: user.dataValues.id, user: user.dataValues.userName  };

      let token = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        noTimestamp: true,
        expiresIn: "1h",
      });

      res.json({ token });
    } else {
      res.Status(404);
    }
  },

  logged: async (req, res, next) => {
    try {
      let token = req.headers["authorization"].split(" ")[1];
      const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);  
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Coudnt Authenticate" });
    }
  },
  confirmLogged: async (req, res) => {
    let user = await models.Users.findOne({
      where: { id: req.user.id },
      attributes: { exclude: ["password"] },
    });

    if (user === null) {
      res.status(404).json({ msg: "User not found" });
    }
    res.status(200).json(user);
  },
};

module.exports = authController;
