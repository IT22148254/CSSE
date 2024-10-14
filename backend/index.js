const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

const doctorRoutes = require("./routes/doctor.Routes");
const availableTimesRoutes = require("./routes/availableTimes.Routes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

module.exports = app;

// Database connection
connectDB();

app.use("/api/doctors", doctorRoutes);
app.use("/api/available-times", availableTimesRoutes);

if (process.env.NODE_ENV !== "test") {
  // Start the server
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
