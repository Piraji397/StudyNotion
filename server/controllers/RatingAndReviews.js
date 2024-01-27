const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const mongoose = require("mongoose");

exports.createRatingAndReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const { courseId, rating, review } = req.body;

    if (!userId || !courseId || !rating || !review) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: {
        $elemMatch: { $eq: userId },
      },
    });

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Student is not enrolled in the course",
      });
    }

    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course is already reviewed by the user",
      });
    }

    const newRatingAndReviews = await RatingAndReview.create({
      user: userId,
      rating: rating,
      review: review,
      course: courseId,
    });

    await Course.findByIdAndUpdate(courseId, {
      $push: {
        ratingAndReviews: newRatingAndReviews._id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Ratting and raview creted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while creating rating and review",
      error,
    });
  }
};

exports.getAllRatingAndReviews = async (req, res) => {
  try {
    const allRatingAndReviewsDetails = await RatingAndReview(
      {},
      {
        user: true,
        rating: true,
        review: true,
        course: true,
      }
    )
      .sort({ rating: "desc" })
      .populate({
        path: "user",
        select: "firstName, lastName, email, image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({
      success: true,
      data: allRatingAndReviewsDetails,
      message: "All rating and review fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching rating and review",
      error,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const { courseId } = req.body;

    const result = await RatingAndReview.aggregate(
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: {
            $avg: "$rating",
          },
        },
      }
    );

    if (result.length > 0) {
      return res.status(200).json({
        success: true,
        averageRating: result[0].averageRating,
        message: "Average rating fetched successfully",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Average rating is 0, no ratings given till now",
      averageRating: 0,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching average rating",
      error,
    });
  }
};
