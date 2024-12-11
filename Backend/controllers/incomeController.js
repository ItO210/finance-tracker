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
    res.json(incomes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
