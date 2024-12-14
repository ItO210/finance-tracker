const upload = require("../config/multerConfig"); // Import multer configuration
const Income = require("../models/incomeModel");

exports.createIncome = (req, res) => {
  // Handle the file upload with multer middleware
  upload.array("files", 5)(req, res, async (err) => {
    // 'files' is the name of the input field, and 5 is the max file count
    if (err) {
      return res
        .status(400)
        .json({ message: "File Upload Failed", error: err.message });
    }

    try {
      // Extract data from the request body
      const { description, amount, category, date } = req.body;

      // Check if files were uploaded
      const files = req.files
        ? req.files.map((file) => ({
            data: file.buffer,
            contentType: file.mimetype,
          }))
        : [];

      // Create the income document with the provided details and files
      const income = new Income({
        description,
        amount,
        category,
        date,
        files,
      });

      // Save the income entry to the database
      await income.save();

      res.status(201).json({ message: "Income Created Successfully", income });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error Creating Income", error: error.message });
    }
  });
};

exports.getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find();
    res.status(200).json({ message: "Incomes Fetched Successfully", incomes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Incomes", error: error.message });
  }
};

exports.getIncomeById = async (req, res) => {
  try {
    const incomeId = req.params.id;
    const income = await Income.find(incomeId);
    res.status(200).json({ message: "Income Fetched Successfully", income });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Income", error: error.message });
  }
};

exports.updateIncomeById = async (req, res) => {
  try {
    const incomeId = req.params.id;
    const { description, amount, category, date, files } = req.body;
    const updatedIncome = await Income.findByIdAndUpdate(
      incomeId,
      { description, amount, category, date, files },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Income Updated Successfully", updatedIncome });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Updating Income", error: error.message });
  }
};

exports.deleteIncomeById = async (req, res) => {
  try {
    const incomeId = req.params.id;
    const deletedIncome = await Income.findByIdAndDelete(incomeId);
    res
      .status(200)
      .json({ message: "Income Deleted Successfully", deletedIncome });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting Income", error: error.message });
  }
};

exports.filterIncomesByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const incomes = await Income.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    res.status(200).json({ message: "Incomes Fetched Successfully", incomes });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Incomes", error: error.message });
  }
};
