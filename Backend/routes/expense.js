const express = require("express");
const expenseController = require("../controllers/expense");
const router = express.Router();

router.post("/addexpense", expenseController.addExpense);
router.get("/getexpense", expenseController.getExpenses);
router.delete("/:expenseId", expenseController.deleteExpense);

module.exports = router;
