const express = require("express");
const router = express.Router();

//import course controllers
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
  getFullCourseDetails,
  editCourse,
  getInstructorCourses,
  deleteCourse,
} = require("../controllers/Course");

//import category controllers
const {
  createCategory,
  showAllCategories,
  categoryPageDetails,
} = require("../controllers/Category");

//import section controllers
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");

//import subsection controllers
const {
  createSubSection,
  updateSubSection,
  deleteSubSection,
} = require("../controllers/Subsection");

//import rating and reviews controllers
const {
  createRatingAndReviews,
  getAllRatingAndReviews,
  getAverageRating,
} = require("../controllers/RatingAndReviews");

// import middlewares
const {
  auth,
  isStudent,
  isInstructor,
  isAdmin,
} = require("../middlewares/Auth");

// ****************************
//     Course Routes
// ****************************

//courses can only be created by instructor
router.post("/createCourse", auth, isInstructor, createCourse);
//Add a section to a course
router.post("/addSection", auth, isInstructor, createSection);
//update a section
router.put("/updateSection", auth, isInstructor, updateSection);
//delete a section
router.delete("/deleteSection", auth, isInstructor, deleteSection);
//Add subsection to a section
router.post("/addSubSection", auth, isInstructor, createSubSection);
//update subsection
router.put("/updateSubSection", auth, isInstructor, updateSubSection);
//delete subsection
router.delete("/deleteSubSection", auth, isInstructor, deleteSubSection);
//show all courses
router.get("/getAllCourses", showAllCourses);
//get course details
router.get("/getCourseDetails", getCourseDetails);
// Get Details for a Specific Courses
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
// Edit Course routes
router.post("/editCourse", auth, isInstructor, editCourse);
// Get all Courses Under a Specific Instructor
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
// Delete a Course
router.delete("/deleteCourse", auth, isInstructor, deleteCourse);

// ****************************
//   Category Routes
// ****************************

//category can only be created by admin
router.post("/createCategory", auth, isAdmin, createCategory);
//show all categories
router.get("/getAllCategories", showAllCategories);
//get category page details
router.get("/getCategoryPageDetails", categoryPageDetails);

// ****************************
// Rating and reviews routes //
// ****************************

//rating and review can only be created by student
router.post("/createRating", auth, isStudent, createRatingAndReviews);
//get all rating and reviews
router.get("/getAllRatingAndReviews", getAllRatingAndReviews);
//get average rating
router.get("/getAverageRating", getAverageRating);

module.exports = router;
