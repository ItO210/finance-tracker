const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const expenseSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category",
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  necessity: {
    type: Boolean,
    required: true,
  },
  installments: {
    type: Number,
    default: 0,
  },
  files: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

module.exports = mongoose.model("Expense", expenseSchema);
