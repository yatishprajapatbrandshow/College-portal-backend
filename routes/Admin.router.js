const express = require("express");

const router = express.Router();

const { AdminController } = require("../controller");

// Admin routes
router.post("/register", AdminController.register);    // Route for admin registration
router.post("/login", AdminController.auth);           // Route for admin login
router.put("/update/:id", AdminController.updateAdmin);  // Route for updating admin details
router.delete("/delete/:id", AdminController.deleteAdmin);  // Route for deleting admin (soft delete)

module.exports = router;
