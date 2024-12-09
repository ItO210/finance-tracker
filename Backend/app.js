const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const categoryRoutes = require("./routes/categoryRoutes");
const incomeRoutes = require("./routes/incomeRoutes");

const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/finance-tracker")
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
