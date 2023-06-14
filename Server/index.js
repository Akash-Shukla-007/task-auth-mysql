require("dotenv").config();
const express = require("express");
const app = express();
var mysql = require("mysql");
const Sequelize = require("sequelize");
const User = require("./Schema/UserSchema");
const Task = require("./Schema/taskSchema");
const userRoutes = require("./Routes/AuthRoutes");
const taskRoutes = require("./Routes/TaskRoutes");
const bodyParser = require("body-parser");
const sequalize = require("./Schema/model");
const cors = require("cors");

app.use(cors());

app.use(bodyParser.json());
app.use("", userRoutes);
app.use("", taskRoutes);

sequalize
  .authenticate()
  .then(() => {
    console.log("Connection has been stablised successfully.");
    app.listen(8000, () => {
      console.log("server runnning ");
    });
  })
  .catch((err) => {
    console.log("Unable to connect to the database", err);
  });
