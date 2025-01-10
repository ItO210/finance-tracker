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
      const {
        description,
        amount,
        category,
        card,
        necessity,
        installments,
        date, // this is the startDate coming from the request
      } = req.body;

      // Default startDate to the current date if not provided
      const startDate = date ? new Date(date) : new Date();

      const expenseData = {
        description,
        amount,
        category,
        card,
        startDate,
        necessity,
        files: req.files
          ? req.files.map((file) => ({
              data: file.buffer,
              contentType: file.mimetype,
            }))
          : [],
      };

      // Handle installments logic if installments are provided
      if (installments && installments > 0) {
        let installmentDates = [];

        // Add the start date as the first installment
        installmentDates.push(startDate);

        // Calculate the installment dates
        let currentInstallmentDate = startDate;
        for (let i = 1; i < installments; i++) {
          currentInstallmentDate = new Date(
            currentInstallmentDate.setMonth(
              currentInstallmentDate.getMonth() + 1
            )
          );
          installmentDates.push(new Date(currentInstallmentDate));
        }

        // The last installment date becomes the endDate
        const endDate = installmentDates[installmentDates.length - 1];

        // Add the installment dates and endDate to the expense data
        expenseData.installmentDates = installmentDates;
        expenseData.endDate = endDate;
      }

      // Create the expense document
      const expense = new Expense(expenseData);

      // Save the expense to the database
      await expense.save();

      // Send a successful response
      res
        .status(201)
        .json({ message: "Expense Created Successfully", expense });
    } catch (error) {
      // Handle errors
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

exports.updateExpenseById = (req, res) => {
  upload.array("files", 5)(req, res, async (err) => {
    if (err) {
      return res
        .status(400)
        .json({ message: "File Upload Failed", error: err.message });
    }

    try {
      const expenseId = req.params.id;
      const {
        description,
        amount,
        category,
        card,
        startDate,
        necessity,
        installments,
      } = req.body;

      const expense = await Expense.findById(expenseId);
      if (!expense) {
        return res.status(404).json({ message: "Expense not found" });
      }

      if (
        !description ||
        !amount ||
        !category ||
        !card ||
        !startDate ||
        necessity === undefined
      ) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const files = req.files
        ? req.files.map((file) => ({
            data: file.buffer,
            contentType: file.mimetype,
          }))
        : [];

      const updatedData = {
        description: description || expense.description,
        amount: amount || expense.amount,
        category: category || expense.category,
        card: card || expense.card,
        startDate: new Date(startDate) || expense.startDate,
        necessity: necessity || expense.necessity,
        files: files.length > 0 ? files : expense.files,
      };

      if (installments && installments > 0) {
        let installmentDates = [];
        let currentInstallmentDate = new Date(updatedData.startDate);

        for (let i = 0; i < installments; i++) {
          installmentDates.push(new Date(currentInstallmentDate));
          currentInstallmentDate.setMonth(
            currentInstallmentDate.getMonth() + 1
          );
        }

        updatedData.installmentDates = installmentDates;
        updatedData.endDate = installmentDates[installmentDates.length - 1];
      }

      const updatedExpense = await Expense.findByIdAndUpdate(
        expenseId,
        updatedData,
        { new: true }
      );

      res.status(200).json({
        message: "Expense Updated Successfully",
        updatedExpense,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Error Updating Expense",
        error: error.message,
      });
    }
  });
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
