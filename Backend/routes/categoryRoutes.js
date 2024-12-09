const express = require("express");
const router = express.Router();
const { createCategory } = require("../controllers/categoryController");

router.post("/category", createCategory);

module.exports = router;
