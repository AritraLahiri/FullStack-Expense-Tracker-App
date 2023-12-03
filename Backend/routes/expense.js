const express = require("express");
const expenseController = require("../controllers/expense");
const router = express.Router();
const userAuthMiddleware = require("../middleware/userAuth");

router.post("/addexpense", userAuthMiddleware, expenseController.addExpense);
router.get("/getexpense", userAuthMiddleware, expenseController.getExpenses);
router.get(
  "/getalluserexpenses",
  userAuthMiddleware,
  expenseController.getAllUserExpenses
);
router.delete(
  "/:expenseId",
  userAuthMiddleware,
  expenseController.deleteExpense
);

module.exports = router;
