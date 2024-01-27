const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
  try {
    //get email
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Your Email is not registered with us",
      });
    }

    //generate token
    // const token = crypto.randomUUID();
    const token = crypto.randomBytes(20).toString("hex");
    //update user by adding token and expiration time
    const updatedDetails = await User.findOneAndUpdate(
      { email: email },
      { token: token, resetPasswordExpires: Date.now() + 3600000 },
      { new: true }
    );
    console.log("Current Date", Date.now() + 3600000);
    console.log("Current Date", Date.now());
    console.log("DETAILS", updatedDetails);

    // create url
    const url = `http://localhost:3000/update-password/${token}`;

    // send mail
    await mailSender(
      email,
      "Password Reset Link",
      `To reset password click here ${url}`
    );

    return res.status(200).json({
      success: true,
      message:
        "Email sent successfully, Please check email and change password",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, while sending reset link",
    });
  }
};

//resetPassword
exports.resetPassword = async (req, res) => {
  try {
    // data fetch
    const { password, confirmPassword, token } = req.body;

    //validation
    if (password !== confirmPassword) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }

    // get user details from db using token
    const userDetails = await User.findOne({ token: token });

    // if no token - invalid token
    if (!userDetails) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid",
      });
    }

    //token time check
    if (!(userDetails.resetPasswordExpires > Date.now())) {
      return res.status(401).json({
        success: false,
        message: "Token is expired",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //update password
    await User.findOneAndUpdate(
      { token: token },
      { password: hashedPassword },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Password reset successfully...",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while resetting password",
    });
  }
};
