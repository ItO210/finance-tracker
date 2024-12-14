const upload = require("../config/multerConfig");
const Expense = require("../models/expenseModel");

exports.createExpense = (req, res) => {
  upload.array("files", 5)(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File Upload Failed", error: err.message });
    }

    try {
      const { description, amount, category, necessity, installments, date } =
        req.body;

      const files = req.files
        ? req.files.map((file) => ({
            data: file.buffer,
            contentType: file.mimetype,
          }))
        : [];

      const expense = new Expense({
        description,
        amount,
        category,
        date,
        necessity,
        installments,
        files,
      });

      await expense.save();

      res
        .status(201)
        .json({ message: "Expense Created Successfully", expense });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error Creating Expense", error: error.message });
    }
  });
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res
      .status(200)
      .json({ message: "Expenses Fetched Successfully", expenses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Expenses", error: error.message });
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const expense = await Expense.find(expenseId);
    res.status(200).json({ message: "Expense Fetched Successfully", expense });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Expense", error: error.message });
  }
};

exports.updateExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const {
      description,
      amount,
      category,
      date,
      necessity,
      installments,
      files,
    } = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(
      expenseId,
      { description, amount, category, date, necessity, installments, files },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Expense Updated Successfully", updatedExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Updating Expense", error: error.message });
  }
};

exports.deleteExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const deletedExpense = await Expense.findByIdAndDelete(expenseId);
    res
      .status(200)
      .json({ message: "Expense Deleted Successfully", deletedExpense });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting Expense", error: error.message });
  }
};

exports.filterExpensesByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const expenses = await Expense.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    res
      .status(200)
      .json({ message: "Expenses Fetched Successfully", expenses });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Expenses", error: error.message });
  }
};
