var Sequelize = require("sequelize");
var sequelize = require("../dbConnection").sequelize;
module.exports = {
  profile: require("./profile")(Sequelize, sequelize, Sequelize.DataTypes),
};