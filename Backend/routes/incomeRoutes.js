const express = require("express");
const router = express.Router();
const incomeController = require("../controllers/incomeController");

router.post("/income", incomeController.createIncome);
router.get("/income", incomeController.getIncomes);
router.get("/income/:id", incomeController.getIncome);
router.put("income/:id", incomeController.updateIncome);
router.delete("/income/:id", incomeController.deleteIncome);
router.post("income/filter-by-date", incomeController.filterIncomesByDate);

module.exports = router;
