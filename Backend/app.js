const path = require("path");
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const userRoute = require("./routes/user");
const expenseRoute = require("./routes/expense");
const orderRoute = require("./routes/order");
const User = require("./models/user");
const Expense = require("./models/expense");
const Order = require("./models/order");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
app.use("/user", userRoute);
app.use("/expense", expenseRoute);
app.use("/order", orderRoute);
User.hasMany(Expense);
Expense.belongsTo(User);
User.hasMany(Order);
Order.belongsTo(User);
sequelize
  .sync()
  .then((res) => {
    // console.log(res);
  })
  .catch((err) => console.log(err));

app.listen(3000);
