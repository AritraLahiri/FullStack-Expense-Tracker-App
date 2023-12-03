const User = require("../models/user");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secret = require("../util/secret");
const saltRounds = 10;
const brevo = require("@getbrevo/brevo");

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
      totalExpense: 0,
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
exports.forgotPassword = (req, res, next) => {
  const email = req.body.email;
  let defaultClient = brevo.ApiClient.instance;
  let apiKey = defaultClient.authentications["api-key"];
  apiKey.apiKey = process.env.API_KEY_MAIL;
  let apiInstance = new brevo.TransactionalEmailsApi();
  let sendSmtpEmail = new brevo.SendSmtpEmail();
  sendSmtpEmail.subject = "{{params.subject}} for Expense App";
  sendSmtpEmail.htmlContent =
    "<html><body><h1>Hello user, This mail is for {{params.parameter}}</h1></body></html>";
  sendSmtpEmail.sender = { name: "Aritra", email: "aritralahiri17@gmail.com" };
  sendSmtpEmail.to = [{ email, name: "Aritra" }];
  sendSmtpEmail.params = {
    parameter: "Reset your password",
    subject: "Reset Password",
  };
  apiInstance
    .sendTransacEmail(sendSmtpEmail)
    .then((data) => {
      if (data) {
        res
          .status(201)
          .json({ success: true, message: "Mail successfully Send" });
      }
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: "Mail Not Sent" });
    });
};

function generateAccessToken(id) {
  return jwt.sign({ userId: id }, secret);
}
