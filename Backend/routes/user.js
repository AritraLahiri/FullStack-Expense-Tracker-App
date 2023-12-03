const express = require("express");
const userController = require("../controllers/user");
const router = express.Router();

router.post("/signup", userController.signUpUser);
router.post("/login", userController.logInUser);
router.post("/password/forgotpassword", userController.forgotPassword);
router.get("/password/resetpassword/:id", userController.resetPassword);
router.post("/password/updatePassword/:id", userController.updatePassword);

module.exports = router;
