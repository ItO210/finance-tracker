const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  type: {
    type: String,
    enum: ["Credit", "Debit"],
    required: true,
  },
  bankName: {
    type: String,
    required: true,
  },
  tier: {
    type: String,
    required: true,
  },
  network: {
    type: String,
    enum: ["Visa", "MasterCard", "AMEX"],
  },
  lastFourDigits: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{4}$/.test(v);
      },
      message: "Invalid last four digits format",
    },
  },
  expirationDate: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^(0[1-9]|1[0-2])\/\d{2}$/.test(v);
      },
      message: "Invalid expiration date format",
    },
  },
  annualFee: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Card", cardSchema);
