const RecurringPayment = require("../models/recurringPaymentModel");

exports.createRecurringPayment = async (req, res) => {
  try {
    const { name, amount, frequency, startDate, category, nextOccurrence } =
      req.body;
    const recurringPayment = new RecurringPayment({
      name,
      amount,
      frequency,
      startDate,
      category,
      nextOccurrence,
    });
    await recurringPayment.save();
    res.status(201).json({
      message: "Recurring Payment Created Successfully",
      recurringPayment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Creating Recurrent Payment",
      error: error.message,
    });
  }
};

exports.getRecurringPaymentById = async (req, res) => {
  try {
    const recurringPaymentId = req.params.id;
    const recurringPayment = await RecurringPayment.findById(
      recurringPaymentId
    );
    res.status(200).json({
      message: "Recurring Payment Fetched Successfully",
      recurringPayment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Recurring Payment",
      error: error.message,
    });
  }
};

exports.getAllRecurringPayments = async (req, res) => {
  try {
    const recurringPayments = await RecurringPayment.find();
    res.status(200).json({
      message: "Recurring Payments Fetched Succsfully",
      recurringPayments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Recurring Payments",
      error: error.message,
    });
  }
};

exports.updateRecurringPaymentById = async (req, res) => {
  try {
    const recurringPaymentId = req.params.id;

    const { name, amount, frequency, startDate, category, nextOccurrence } =
      req.body;

    const updatedRecurringPayment = await RecurringPayment.findByIdAndUpdate(
      recurringPaymentId,
      {
        name,
        amount,
        frequency,
        startDate,
        category,
        nextOccurrence,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Recurring Payment Updated Successfully",
      updatedRecurringPayment,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Updating Recurring Payment",
      error: error.message,
    });
  }
};

exports.deleteRecurringPaymentById = async (req, res) => {
  try {
    const recurringPaymentId = req.params.id;
    const deletedRecurringPayment = await RecurringPayment.findByIdAndDelete(
      recurringPaymentId
    );
    res.status(200).json({ message: "Recurrent Payment Deleted Successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error Deleting Recurrent Payment",
      error: error.message,
    });
  }
};
