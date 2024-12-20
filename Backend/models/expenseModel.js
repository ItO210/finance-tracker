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
  date: {
    type: Date,
    default: Date.now,
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
