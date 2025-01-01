const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const categoryRoutes = require("./routes/categoryRoutes");
const incomeRoutes = require("./routes/incomeRoutes");
const expenseRoutes = require("./routes/expenseRoutes");
const investmentRoutes = require("./routes/investmentRoutes");
const cardRoutes = require("./routes/cardRoutes");
const transactionsController = require("./routes/transactionsRoutes");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/finance-tracker")
  //mongodb://192.168.100.4:27017
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log("Database Connection Error", err);
  });

const corsOptions = {
  origin: "*", //cambiar a forntend url
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.use("/", categoryRoutes);
app.use("/", incomeRoutes);
app.use("/", expenseRoutes);
app.use("/", investmentRoutes);
app.use("/", cardRoutes);
app.use("/", transactionsController);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
