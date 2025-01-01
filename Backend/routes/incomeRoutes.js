const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");

router.post("/income", incomeController.createIncome);
router.get("/incomes", incomeController.getIncomes);
router.get("/income/:id", incomeController.getIncomeById);
router.put("income/:id", incomeController.updateIncomeById);
router.delete("/income/:id", incomeController.deleteIncomeById);

router.post("income/filter-by-date", incomeController.filterIncomesByDate);

module.exports = router;
