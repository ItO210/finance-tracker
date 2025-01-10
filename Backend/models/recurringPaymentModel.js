const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const recurringPaymentSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  frequency: {
    type: {
      type: String,
      enum: ["daily", "weekly", "monthly", "yearly"],
      required: true,
    },
    interval: {
      type: Number,
      required: true,
    },
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
  },
  nextOccurrence: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("RecurringPayment", recurringPaymentSchema);
