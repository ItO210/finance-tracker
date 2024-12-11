const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

router.post("/category", categoryController.createCategory);
router.get("/category/:type", categoryController.getCategoriesByType);
router.get("/category/:id", categoryController.getCategoryById);
router.get("/categories", categoryController.getAllCategories);
router.put("/category/:id", categoryController.updateCategoryById);
router.delete("/category/:id", categoryController.deleteCategoryById);

module.exports = router;
