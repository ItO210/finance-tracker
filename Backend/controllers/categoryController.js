const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const category = new Category({ name, type });
    await category.save();
    res
      .status(201)
      .json({ message: "Category Created Successfully", category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Creating Category", error: error.message });
  }
};

exports.getCategoriesByType = async (req, res) => {
  try {
    const { type } = req.params;
    const categories = await Category.find({ type });

    res
      .status(200)
      .json({ message: "Categories Fetched Successfully", categories });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Categories", error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    res
      .status(200)
      .json({ message: "Category Fetched Successfully", category });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Category", error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res
      .status(200)
      .json({ message: "Categories Fetched Successfully", categories });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Categories", error: error.message });
  }
};

exports.updateCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, type } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, type },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Category Updated Successfully", updatedCategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Updating Category", error: error.message });
  }
};

exports.deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    res
      .status(200)
      .json({ message: "Category Deleted Successfully", deletedCategory });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting Category", error: error.message });
  }
};
