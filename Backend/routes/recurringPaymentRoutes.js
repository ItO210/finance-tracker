const express = require("express");
const router = express.Router();
const recurringPaymentController = require("../controllers/recurringPaymentController");

router.post(
  "/recurringPayment",
  recurringPaymentController.createRecurringPayment
);
router.get(
  "/recurringPayment/:id",
  recurringPaymentController.getRecurringPaymentById
);
router.get(
  "/recurringPayments",
  recurringPaymentController.getAllRecurringPayments
);
router.put(
  "/recurringPayment/:id",
  recurringPaymentController.updateRecurringPaymentById
);
router.delete(
  "/recurringPayment/:id",
  recurringPaymentController.deleteRecurringPaymentById
);

module.exports = router;
