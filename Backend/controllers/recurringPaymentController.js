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

const RecurringPayment = require("../models/recurringPaymentModel");

// Function to compute the next occurrence based on frequency
const computeNextOccurrence = (currentDate, frequency) => {
  const nextDate = new Date(currentDate);

  switch (frequency.type) {
    case "daily":
      nextDate.setDate(nextDate.getDate() + frequency.interval);
      break;
    case "weekly":
      nextDate.setDate(nextDate.getDate() + 7 * frequency.interval);
      break;
    case "monthly":
      nextDate.setMonth(nextDate.getMonth() + frequency.interval);
      break;
    case "yearly":
      nextDate.setFullYear(nextDate.getFullYear() + frequency.interval);
      break;
    default:
      throw new Error("Invalid frequency type");
  }

  return nextDate;
};

exports.getUpcomingRecurringPayments = async (req, res) => {
  try {
    const now = new Date(); // Current date to compare nextOccurrence

    // Fetch all recurring payments
    const recurringPayments = await RecurringPayment.find();

    // Filter and update the nextOccurrence if necessary
    const updatedPayments = recurringPayments.map((payment) => {
      if (payment.nextOccurrence < now) {
        payment.nextOccurrence = computeNextOccurrence(
          payment.nextOccurrence,
          payment.frequency
        );
      }

      return payment;
    });

    // Filter upcoming payments (nextOccurrence is in the future)
    const upcomingPayments = updatedPayments.filter(
      (payment) => payment.nextOccurrence >= now
    );

    res.status(200).json({
      message: "Upcoming Recurring Payments Fetched Successfully",
      upcomingPayments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Upcoming Recurring Payments",
      error: error.message,
    });
  }
};
