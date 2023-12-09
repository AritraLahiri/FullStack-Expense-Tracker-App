const e = require("express");
const Expense = require("../models/expense");
const Sequelize = require("sequelize");
const User = require("../models/user");

exports.getExpenses = async (req, res, next) => {
  Expense.findAndCountAll({
    where: { userId: req.user.id },
    offset: parseInt(req.params.pageNo) * 2,
    limit: 2,
  })
    .then((expense) => {
      if (!expense)
        res.status(404).json({ success: false, message: "Expense not found" });
      else {
        const count = expense.count;
        const hasPreviousPage = parseInt(req.params.pageNo) == 0 ? false : true;
        const hasNextPage =
          (parseInt(req.params.pageNo) + 1) * 2 >= count ? false : true;
        const previousPageNo =
          parseInt(req.params.pageNo) == 0
            ? 0
            : parseInt(req.params.pageNo) - 1;
        const nextPageNo =
          (parseInt(req.params.pageNo) + 1) * 2 == count
            ? -1
            : parseInt(req.params.pageNo) + 1;
        const currentPage = parseInt(req.params.pageNo) + 1;
        const pageDetails = {
          hasNextPage,
          hasPreviousPage,
          nextPageNo,
          previousPageNo,
          currentPage,
        };
        expense.pageDetails = pageDetails;
        res.json(expense);
      }
    })
    .catch((err) => {
      console.log(err);
      res.json(err);
    });
};

exports.getAllUserExpenses = (req, res, next) => {
  User.findAll({
    attributes: ["name", "totalExpense"],
    order: [["totalExpense", "DESC"]],
  })
    .then((expense) => {
      if (!expense)
        res.status(404).json({ success: false, message: "Expense not found" });
      else {
      }
      res.json(expense);
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
  User.findOne({ where: { id: req.user.id } })
    .then((user) => {
      return user.update({
        totalExpense: user.totalExpense + parseInt(amount),
      });
    })
    .then(() => {
      Expense.create({ amount, description, category, userId: req.user.id })
        .then((expense) => {
          if (!expense)
            res
              .status(404)
              .json({ success: false, message: "Expense not added" });
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
    })
    .catch((err) => console.log(err));
};
exports.deleteExpense = (req, res, next) => {
  const expenseId = req.params.expenseId;

  Expense.findByPk(expenseId)
    .then((expense) => {
      if (!expense) res.json({ success: false, message: "Expense not found" });
      else {
        console.log(req.user.id);
        User.findOne({ where: { id: req.user.id } })
          .then((user) => {
            console.log(user);
            return user.update({
              totalExpense: user.totalExpense - expense.amount,
            });
          })
          .then(() => {
            return expense.destroy();
          });
      }
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
