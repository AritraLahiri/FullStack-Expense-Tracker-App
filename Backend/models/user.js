const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: {
      args: true,
      msg: "Email address already in use!",
    },
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isPremiumUser: Sequelize.BOOLEAN,
  totalExpense: {
    type: Sequelize.DOUBLE,
    allowNull: false,
  },
});
module.exports = User;
