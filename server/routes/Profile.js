const express = require("express");
const router = express.Router();

//import profile controller
const {
  updateProfile,
  deleteAccount,
  getAllUserDetails,
  getEnrolledCourses,
  updateDisplayPicture,
} = require("../controllers/Profile");

// middlewares
const { auth } = require("../middlewares/Auth");

//updateProfile can only be access to authorized users
router.post("/updateProfile", auth, updateProfile);
//delete account can only be access to authorized users
router.delete("/deleteAccount", auth, deleteAccount);
//get all user Details can only be access to authorized users
router.post("/getUserDetails", auth, getAllUserDetails);

router.get("/getEnrolledCourses", auth, getEnrolledCourses);
router.put("/updateDisplayPicture", auth, updateDisplayPicture);

module.exports = router;
