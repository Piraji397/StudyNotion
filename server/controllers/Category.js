const Category = require("../models/Category");

//create tag
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(403).json({
        success: false,
        message: "ALl fields are mandatory",
      });
    }

    const categoryDetails = await Category.create({
      name: name,
      description: description,
    });

    return res.status(200).json({
      success: true,
      message: "Tag created successfu;;y",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//get all tags
exports.showAllCategories = async (req, res) => {
  try {
    const allCategories = await Category.find(
      {},
      { name: true, description: true }
    );

    return res.status(200).json({
      success: true,
      data: allCategories,
      messsage: "All tags fetched",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate("courses")
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Data not found",
      });
    }

    //get courses for different categories
    const differentCategories = await Category.find({
      _id: {
        $ne: categoryId,
      },
    })
      .populate("courses")
      .exec();

    //get top selling courses
    //HW

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategories,
      },
      message: "All catedory page details fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error occured while fetching category page details",
    });
  }
};
