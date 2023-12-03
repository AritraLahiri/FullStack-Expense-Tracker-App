const exress = require("express");
const Order = require("../models/order");
const Sequelize = require("sequelize");
const Razorpay = require("razorpay");

exports.addOrder = (req, res) => {
  const rzr = new Razorpay({
    key_id: process.env.API_ID,
    key_secret: process.env.API_SECRET,
  });
  const amount = 2500;
  rzr.orders.create({ amount, currency: "INR" }, (err, order) => {
    if (err) throw new Error(JSON.stringify(err));
    console.log(order);
    req.user
      .createOrder({ orderid: order.id, status: "PENDING" })
      .then(() => {
        return res.status(201).json({ order, key_id: rzr.key_id });
      })
      .catch((err) => console.log(err));
  });
};
exports.updateOrderStatus = (req, res, next) => {
  const { payment_id, order_id } = req.body;
  Order.findOne({ where: { orderid: order_id } })
    .then((order) => {
      order
        .update({ paymentid: payment_id, status: "SUCCESSFULL" })
        .then(() => {
          req.user.update({ isPremiumUser: true }).then(() => {
            return res
              .status(202)
              .json({ success: true, message: "Transaction successfull" });
          });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => console.log(err));
};
