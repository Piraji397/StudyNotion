const User = require("../models/User");
const OTP = require("../models/Otp");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
require("dotenv").config();

//sendOTP
exports.sendOTP = async (req, res) => {
  try {
    //fetch email from request
    const { email } = req.body;
    const checkUserPresent = await User.findOne({ email });

    if (checkUserPresent) {
      return res.status(401).json({
        success: true,
        message: "User already registered",
      });
    }

    //genertate otp
    let otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    // console.log("OTP - ", otp);

    //check unique otp or not
    const result = await OTP.findOne({ otp });
    // console.log("result - ", result);

    while (result) {
      // console.log("result - ", result);
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }

    // result = await OTP.findOne({ otp });

    const otpPayload = {
      email,
      otp,
    };

    const otpBody = await OTP.create(otpPayload);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otp,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//signUp
exports.signUp = async (req, res) => {
  try {
    //data fetch from request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    //validation data
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    //check 2 passwords are same
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and confirm password does not match, Please try again",
      });
    }

    //check user already exist or not
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already registered",
      });
    }

    //find recent otp
    const recentOtp = await OTP.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    // console.log("recentotp data", recentOtp);
    // console.log("recentotp", recentOtp[0].otp);
    if (recentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "OTP not found",
      });
    } else if (otp !== recentOtp[0].otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //entry create in DB
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      contactNumber: null,
    });

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(200).json({
      success: true,
      message: "User is registered successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const existingUser = await User.findOne({ email })
      .populate("additionalDetails")
      .exec();

    if (!existingUser) {
      return res.status(401).json({
        success: false,
        massage: "User is not registered, Please signup first",
      });
    }

    if (await bcrypt.compare(password, existingUser.password)) {
      const payload = {
        email: existingUser.email,
        id: existingUser._id,
        accountType: existingUser.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      existingUser.token = token;
      existingUser.password = undefined;

      //create cookie and send response
      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };

      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user: existingUser,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//forgotPassword
exports.changePassword = async (req, res) => {
  try {
    //get data from req body
    const { oldPassword, newPassword, confirmNewPassword } = req.body;
    const id = req.user.id;

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    if (newPassword !== confirmNewPassword) {
      return res.status(401).json({
        success: false,
        message: "Password is not matched, Please try again",
      });
    }

    const userData = await User.findById(id);
    // console.log("userData", userData);

    if (await bcrypt.compare(oldPassword, userData.password)) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      // console.log("hashedNewPassword", hashedNewPassword);

      const updatedUser = await User.findOneAndUpdate(
        {
          _id: id,
        },
        {
          password: hashedNewPassword,
        },
        { new: true }
      );
      console.log("updatedUser", updatedUser);

      await mailSender(
        updatedUser.email,
        "Password changed",
        `Password changed successfully.\n Changed passord ${newPassword}`
      );

      return res.status(200).json({
        success: true,
        message: "Password changed successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Current password does not match",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
