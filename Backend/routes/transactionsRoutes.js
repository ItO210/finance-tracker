const express = require("express");
const router = express.Router();
const transactionsController = require("../controllers/transactionsController");

router.post("/transactions", transactionsController.getTransactions);

module.exports = router;
