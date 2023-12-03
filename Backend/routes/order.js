const express = require("express");
const orderController = require("../controllers/order");
const router = express.Router();
const userAuthMiddleware = require("../middleware/userAuth");

router.get("/buypremium", userAuthMiddleware, orderController.addOrder);
router.post(
  "/updatetransactionstatus",
  userAuthMiddleware,
  orderController.updateOrderStatus
);

module.exports = router;
