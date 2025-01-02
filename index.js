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
const { CollegeRouter, ProgramRouter, AccommodationRouter, StreamRouter, AdminRouter, UserRouter, AffiliationRouter, DepartmentsRouter, SearchRouter,EventRouter , AdvertisementRouter } = require("./routes"); 

// Routes Started
app.use("/api/college", CollegeRouter);
app.use("/api/program", ProgramRouter);
app.use("/api/accommodation", AccommodationRouter);
app.use("/api/stream", StreamRouter); 
app.use("/api/admin", AdminRouter);
app.use("/api/user" , UserRouter);
app.use("/api/affiliation" , AffiliationRouter);
app.use("/api/departments", DepartmentsRouter);
app.use("/api" , SearchRouter);
app.use("/api/events" , EventRouter);
app.use("/api/advertisement" , AdvertisementRouter);

// Routes Ended

// Start the server
app.listen(PORT || 3000, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
