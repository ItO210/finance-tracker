const express = require("express");
const router = express.Router();
const upcomingPaymentController = require("../controllers/upcomingPaymentController");

router.get("/upcomingPayments", upcomingPaymentController.getUpcomingPayments);

module.exports = router;
