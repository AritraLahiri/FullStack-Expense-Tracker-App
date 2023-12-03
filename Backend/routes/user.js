const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/signup", userController.signUpUser);
router.post("/login", userController.logInUser);
router.post("/password/forgotpassword", userController.forgotPassword);

module.exports = router;
