const User = require("../models/user");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../util/secret");
const saltRounds = 10;

exports.signUpUser = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.log(err);
      res.json(err.message);
    }
    await User.create({
      email,
      name,
      password: hash,
    });
    res.json({ createdUser: true });
  });
};
exports.logInUser = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ where: { email } })
    .then((user) => {
      if (!user)
        res.status(404).json({ message: "User not found", success: false });

      bcrypt.compare(password, user.password, async (err, success) => {
        if (err)
          res
            .status(404)
            .json({ message: "Password didn't match", success: false });
        else if (success)
          res.json({
            message: "Login success",
            success: true,
            token: generateAccessToken(user.id),
            isPremiumUser: user.isPremiumUser,
          });
      });
    })
    .catch((err) => {
      console.log(err);
      return res.json(err);
    });
};

function generateAccessToken(id) {
  return jwt.sign({ userId: id }, secret);
}
