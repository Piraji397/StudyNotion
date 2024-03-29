const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();

exports.createSubSection = async (req, res) => {
  try {
    //fetch data from req body
    const { sectionId, title, description } = req.body;

    //fetch file/video
    const video = req.files.video;

    //validation
    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //uplaod video on cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    //create a sub section
    const subSectionDetails = await SubSection.create({
      title,
      timeDuration: `${uploadDetails.duration}`,
      description,
      videoUrl: uploadDetails.secure_url,
    });

    //update section with this sub section id
    const updateSectionDetails = await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $push: {
          subSection: subSectionDetails._id,
        },
      },

      { new: true }
    )
      .populate("subSection")
      .exec();

    //return res
    return res.status(200).json({
      success: true,
      data: updateSectionDetails,
      message: "Subsection created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while creating sub section",
      error: error,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    //fetch data
    const { sectionId, subSectionId, title, description } = req.body;

    const subSection = await SubSection.findById(subSectionId);

    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "Subsection not found",
      });
    }

    if (title !== undefined) {
      subSection.title = title;
    }

    if (description !== undefined) {
      subSection.description = description;
    }

    if (req.files && req.files.video !== undefined) {
      //fetch video file
      const video = req.files.video;
      //upload new video
      const uploadDetails = await uploadImageToCloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }

    //update the subsection
    await subSection.save();

    const updatedSection = await Section.findById(sectionId)
      .populate("subSection")
      .exec();

    //return res
    return res.status(200).json({
      success: true,
      data: updatedSection,
      message: "Subsection updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "error occured while updating subsection",
      error: error,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    //fetch data
    const { sectionId, subSectionId } = req.body;

    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );

    //delete subsection
    const subSection = await SubSection.findByIdAndDelete(subSectionId);

    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "SubSection not found" });
    }

    const updatedSection = await Section.findById(sectionId)
      .populate("subSection")
      .exec();

    //return res
    return res.status(200).json({
      success: true,
      data: updatedSection,
      message: "Subsection deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while deleting subsection",
      error: error,
    });
  }
};
