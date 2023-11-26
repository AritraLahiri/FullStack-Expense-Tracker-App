const e = require("express");
const Expense = require("../models/expense");
const Sequelize = require("sequelize");

exports.getExpenses = (req, res, next) => {
  Expense.findAll()
    .then((expense) => {
      if (!expense)
        res.status(404).json({ success: false, message: "Expense not found" });
      else res.json(expense);
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};
exports.addExpense = (req, res, next) => {
  const amount = req.body.amount;
  const description = req.body.description;
  const category = req.body.category;
  Expense.create({ amount, description, category })
    .then((expense) => {
      if (!expense)
        res.status(404).json({ success: false, message: "Expense not added" });
      else
        res.json({
          success: true,
          message: "Expense added successfully",
          id: expense.id,
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};
exports.deleteExpense = (req, res, next) => {
  const expenseId = req.params.expenseId;
  console.log(expenseId);
  Expense.findByPk(expenseId)
    .then((expense) => {
      if (!expense) res.json({ success: false, message: "Expense not found" });
      return expense.destroy();
    })
    .then(() => {
      console.log("DESTROYED PRODUCT");
      res.json({ success: true, message: "Deletion success" });
    })
    .catch((err) => {
      console.log(err);
      res.status(404).json(err);
    });
};