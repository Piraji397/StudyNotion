const express = require("express");
const router = express.Router();

//import Auth controllers
const {
  signUp,
  login,
  changePassword,
  sendOTP,
} = require("../controllers/Auth");

//import reset password controllers
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

// middlewares
const { auth } = require("../middlewares/Auth");

//signup
router.post("/signUp", signUp);
//login
router.post("/login", login);
//change password can only access to authorized route
router.post("/changePassword", auth, changePassword);
//send OTP
router.post("/sendOtp", sendOTP);

//reset password token route
router.post("/resetPasswordToken", resetPasswordToken);
// resetPassword route
router.post("/resetPassword", resetPassword);

module.exports = router;
