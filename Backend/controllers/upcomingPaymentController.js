const RecurringPayment = require("../models/recurringPaymentModel");
const Expense = require("../models/expenseModel");

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

exports.getUpcomingPayments = async (req, res) => {
  try {
    const now = new Date();

    // Fetch all recurring payments
    const recurringPayments = await RecurringPayment.find();

    // Filter and update the nextOccurrence if necessary
    const updatedPayments = await Promise.all(
      recurringPayments.map(async (payment) => {
        if (payment.nextOccurrence < now) {
          payment.nextOccurrence = computeNextOccurrence(
            payment.nextOccurrence,
            payment.frequency
          );
          await payment.save(); // Persist changes
        }
        return payment;
      })
    );

    // Filter upcoming payments (nextOccurrence is in the future)
    const upcomingRecurringPayments = updatedPayments.filter(
      (payment) => payment.nextOccurrence >= now
    );

    // Fetch expenses where the endDate hasn't passed
    const expenses = await Expense.find({
      $or: [{ endDate: { $gte: now } }, { endDate: null }],
    });

    // Calculate the next installment date for expenses
    const upcomingExpenses = expenses
      .map((expense) => {
        const { startDate, endDate, installments } = expense;

        const totalMonthsSinceStart = Math.floor(
          (now - new Date(startDate)) / (1000 * 60 * 60 * 24 * 30)
        );

        const nextInstallmentMonth = totalMonthsSinceStart + 1;

        if (installments && nextInstallmentMonth > installments) return null;

        const nextInstallmentDate = new Date(startDate);
        nextInstallmentDate.setMonth(
          nextInstallmentDate.getMonth() + nextInstallmentMonth
        );

        if (
          nextInstallmentDate < now ||
          (endDate && nextInstallmentDate > endDate)
        )
          return null;

        return {
          ...expense.toObject(),
          nextDate: nextInstallmentDate,
        };
      })
      .filter(Boolean);

    // Combine results with a common `nextDate` property
    const upcomingPayments = [
      ...upcomingRecurringPayments.map((payment) => ({
        type: "RecurringPayment",
        nextDate: payment.nextOccurrence,
        ...payment.toObject(),
      })),
      ...upcomingExpenses.map((expense) => ({
        type: "Expense",
        ...expense,
      })),
    ];

    // Sort by `nextDate` from closest to furthest
    upcomingPayments.sort(
      (a, b) => new Date(a.nextDate) - new Date(b.nextDate)
    );

    res.status(200).json({
      message: "Upcoming Payments Fetched Successfully",
      upcomingPayments,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error Fetching Upcoming Payments",
      error: error.message,
    });
  }
};
