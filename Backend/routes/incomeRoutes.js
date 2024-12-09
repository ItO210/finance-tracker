const express = require("express");
const router = express.Router();
const { createIncome } = require("../controllers/incomeController");

router.post("/income", createIncome);

module.exports = router;
