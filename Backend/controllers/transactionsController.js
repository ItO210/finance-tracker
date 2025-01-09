const Expense = require("../models/expenseModel");
const Income = require("../models/incomeModel");
const Investment = require("../models/investmentModel");

exports.getTransactions = async (req, res) => {
  try {
    const { limit = 5, lastDate } = req.body;

    // Parse limit and lastDate
    const parsedLimit = parseInt(limit);
    const parsedLastDate = lastDate ? new Date(lastDate) : new Date();

    // Fetch entries from all collections
    const [expenses, incomes, investments] = await Promise.all([
      Expense.aggregate([
        { $match: { date: { $lt: parsedLastDate } } },
        { $sort: { date: -1 } },
        { $limit: parsedLimit },
      ]),
      Income.aggregate([
        { $match: { date: { $lt: parsedLastDate } } },
        { $sort: { date: -1 } },
        { $limit: parsedLimit },
      ]),
      Investment.aggregate([
        { $match: { startDate: { $lt: parsedLastDate } } },
        { $sort: { date: -1 } },
        { $limit: parsedLimit },
      ]),
    ]);

    // Merge and sort all entries by date
    const allEntries = [...expenses, ...incomes, ...investments];
    allEntries.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Return only the requested number of entries
    const transactions = allEntries.slice(0, parsedLimit);

    res
      .status(200)
      .json({ message: "Entries Fetched Successfully", transactions });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Entries", error: error.message });
  }
};
