const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const forgotPasswordRequest = sequelize.define("forgotPasswordRequest", {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    primaryKey: true,
  },
  isActive: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
});
module.exports = forgotPasswordRequest;
