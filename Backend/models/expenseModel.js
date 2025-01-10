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
  card: {
    type: Schema.Types.ObjectId,
    ref: "Card",
    required: true,
  },
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  necessity: {
    type: Boolean,
    required: true,
  },
  installmentDates: {
    type: [Date],
  },
  files: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

// Export the model
module.exports = mongoose.model("Expense", expenseSchema);
