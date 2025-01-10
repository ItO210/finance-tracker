const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
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
  date: {
    type: Date,
    default: Date.now,
  },
  files: [
    {
      data: Buffer,
      contentType: String,
    },
  ],
});

module.exports = mongoose.model("Income", incomeSchema);
