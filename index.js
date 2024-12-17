const express = require("express");
const connectDB = require("./db");
require("dotenv").config();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(cors()); // To parse JSON request bodies
app.use(express.json()); // To parse JSON request bodies

// Import Routers
const { CollegeRouter, ProgramRouter } = require("./routes");

// Routes Started
app.use("/api/college", CollegeRouter);

app.use("/api/program", ProgramRouter);

// Routes Ended

// Start the server
app.listen(PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
