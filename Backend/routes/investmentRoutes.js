const express = require("express");
const router = express.Router();
const investmentController = require("../controllers/investmentController");

router.post("/investment", investmentController.createInvestment);
router.get("/investments", investmentController.getInvestments);
router.get("/investment/:id", investmentController.getInvestmentById);
router.put("investment/:id", investmentController.updateInvestmentById);
router.delete("/investment/:id", investmentController.deleteInvestmentById);

router.post(
  "investment/filter-by-date",
  investmentController.filterInvestmentsByDate
);

module.exports = router;
