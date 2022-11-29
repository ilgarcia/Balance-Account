const express = require("express");

const cors = require("cors");
const corsOptions = require("./config/corsOption");
const cookieParser = require("cookie-parser");
const credentials = require('./middleware/credentials');

const routes = require("./routes/routes");
const authRoutes = require("./routes/auth");
const dbConnection = require("./database/sequelize")

const { logger } = require('./middleware/logEvents');

const app = express();
const port = 8000;

require("dotenv").config();

// dbConnection.sync();

app.use(logger);

app.use(credentials);

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cookieParser());

// main routes
app.use("/", routes);
// auth routes
app.use("/auth", authRoutes);


app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
