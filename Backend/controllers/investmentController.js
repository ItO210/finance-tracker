const upload = require("../config/multerConfig");
const Investment = require("../models/investmentModel");

exports.createInvestment = (req, res) => {
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
        startDate,
        endDate,
        interestRate,
      } = req.body;

      const files = req.files
        ? req.files.map((file) => ({
            data: file.buffer,
            contentType: file.mimetype,
          }))
        : [];

      const investment = new Investment({
        description,
        amount,
        category,
        startDate,
        endDate,
        interestRate,
        files,
      });

      await investment.save();

      res
        .status(201)
        .json({ message: "Investment Created Successfully", investment });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error Creating Investment", error: error.message });
    }
  });
};

exports.getInvestments = async (req, res) => {
  try {
    const investments = await Investment.find();
    res
      .status(200)
      .json({ message: "Investments Fetched Successfully", investments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Investments", error: error.message });
  }
};

exports.getInvestmentById = async (req, res) => {
  try {
    const investmentId = req.params.id;
    const investment = await Investment.find(investmentId);
    res
      .status(200)
      .json({ message: "Investment Fetched Successfully", investment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Investment", error: error.message });
  }
};

exports.updateInvestmentById = async (req, res) => {
  try {
    const investmentId = req.params.id;
    const {
      description,
      amount,
      category,
      startDate,
      endDate,
      interestRate,
      files,
    } = req.body;
    const updatedInvestment = await Investment.findByIdAndUpdate(
      investmentId,
      {
        description,
        amount,
        category,
        startDate,
        endDate,
        interestRate,
        files,
      },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Investment Updated Successfully", updatedInvestment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Updating Investment", error: error.message });
  }
};

exports.deleteInvestmentById = async (req, res) => {
  try {
    const investmentId = req.params.id;
    const deletedInvestment = await Investment.findByIdAndDelete(investmentId);
    res
      .status(200)
      .json({ message: "Investment Deleted Successfully", deletedInvestment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Deleting Investment", error: error.message });
  }
};

exports.filterInvestmentsByDate = async (req, res) => {
  try {
    const { startDate, endDate } = req.body;
    const investments = await Investment.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    });
    res
      .status(200)
      .json({ message: "Investments Fetched Successfully", investments });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error Fetching Investments", error: error.message });
  }
};
