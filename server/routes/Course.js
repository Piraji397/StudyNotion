const express = require("express");
const router = express.Router();

//import course controllers
const {
  createCourse,
  showAllCourses,
  getCourseDetails,
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
