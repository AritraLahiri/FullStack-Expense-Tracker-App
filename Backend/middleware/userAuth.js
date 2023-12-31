const jwt = require("jsonwebtoken");
const secretKey = require("../util/secret");
const User = require("../models/user");
const userAuthenticate = (req, res, next) => {
  const token = req.header("Authorization");
  const userId = jwt.verify(token, secretKey).userId;
  console.log(userId);
  User.findByPk(userId)
    .then((user) => {
      if (user) {
        req.user = user;
        next();
      }
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: "User not found" });
    });
};
module.exports = userAuthenticate;
