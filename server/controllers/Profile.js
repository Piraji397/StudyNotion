const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.updateProfile = async (req, res) => {
  try {
    // get data
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;

    // get userID
    const id = req.user.id;
    //validation
    if (!contactNumber || !gender || !id) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // find profile
    const userDetails = await User.findById(id);
    const profileId = userDetails.additionalDetails;
    const profileDetails = await Profile.findById(profileId);

    //update profile
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.contactNumber = contactNumber;
    profileDetails.gender = gender;
    await profileDetails.save();

    const user = await User.findById(id).populate("additionalDetails").exec();
    user.password = undefined;
    user.token = undefined;

    //return res
    return res.status(200).json({
      success: true,
      message: "Profile details are updated",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while updating profile",
      error: error,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const userId = req.user.id;

    //validation
    const userDetails = await User.findById(userId);

    if (!userDetails) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //delete profile
    await Profile.findByIdAndDelete({ _id: userDetails.additionalDetails });

    //unenroll the user from all courses
    userDetails.courses.map(async (course) => {
      await Course.findByIdAndUpdate(course, {
        $pull: {
          studentsEnrolled: userId,
        },
      });
    });

    //delete user
    await User.findByIdAndDelete({ _id: userId });

    // return res
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while deleting account",
      error: error,
    });
  }
};

exports.getAllUserDetails = async (req, res) => {
  try {
    const userId = req.user.id;

    const userDetails = await User.findById(userId)
      .populate("additionalDetails")
      .exec();

    return res.status(200).json({
      success: true,
      data: userDetails,
      message: "User data fetched",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching data",
      error,
    });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const id = req.user.id;

    const enrolledCourses = await User.findById(id).populate("courses").exec();

    if (!enrolledCourses) {
      return res.status(401).json({
        success: false,
        message: `Could not find user with id: ${id}`,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Enrolled courses fetched successfully",
      data: enrolledCourses.courses,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching enrolled courses",
      error,
    });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    const image = await uploadImageToCloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
