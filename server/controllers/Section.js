const Course = require("../models/Course");
const Section = require("../models/Section");

exports.createSection = async (req, res) => {
  try {
    //data fetch
    const { sectionName, courseId } = req.body;

    // data validation
    if (!sectionName || !courseId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // create section
    const newSection = await Section.create({ sectionName });

    // update course with sections objectId
    const updatedCourseDetails = await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          courseContent: newSection._id,
        },
      },
      { new: true }
    )
      .populate("Section")
      .populate("SubSection")
      .exec();

    //return res
    return res.status(200).json({
      success: true,
      message: "Section created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while creating section",
      error: error,
    });
  }
};

exports.updateSection = async (req, res) => {
  try {
    //fetch data
    const { sectionName, sectionId } = req.body;

    //data validation
    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are mandatory",
      });
    }

    //update data
    const section = await Section.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );

    // return response
    return res.status(200).json({
      success: true,
      message: "Section name updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while updating section name",
      error: error,
    });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    await Section.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while deleting section",
      error: error,
    });
  }
};
