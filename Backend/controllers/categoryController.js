const Category = require("../models/categoryModel");

exports.createCategory = async (req, res) => {
  try {
    const { name, type } = req.body;
    const category = new Category({ name, type });
    await category.save();
    res
      .status(201)
      .json({ message: "Category Created Successfully", category });
  } catch {
    res
      .status(500)
      .json({ message: "Error Creating Category", error: error.message });
  }
};
