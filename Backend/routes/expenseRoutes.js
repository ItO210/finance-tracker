const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.post("/expense", expenseController.createExpense);
router.get("/expenses", expenseController.getExpenses);
router.get("/expense/:id", expenseController.getExpenseById);
router.put("expense/:id", expenseController.updateExpenseById);
router.delete("/expense/:id", expenseController.deleteExpenseById);

router.post("expense/filter-by-date", expenseController.filterExpensesByDate);

module.exports = router;
