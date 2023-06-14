const { Sequelize, DataTypes } = require("sequelize");
const sequalize = require("./model");

const Task = sequalize.define("tasks", {
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Task;
