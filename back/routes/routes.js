const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.get(
  "/transaction",authController.logged,
  userController.getAllTransactions
);

// router.get(
//   "transaction/:id",
//   tokenHandlerMiddleware(),
//   userController.getMapTransactions
// );

router.post("/transaction", userController.postTransactions);

module.exports = router;
