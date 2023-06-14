const Sequelize = require("sequelize");
const path = "mysql://root:password@localhost:3306/sequal_db";
const sequalize = new Sequelize(path);

module.exports = sequalize;
