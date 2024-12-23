const express = require("express");

const router = express.Router();

const { AdminController } = require("../controller");
const { verifyToken } = require("../middlewares/authMiddleware");

// Admin routes
router.post("/register", AdminController.register);   // Route for admin registration
router.post("/login", AdminController.auth);         // Route for admin login
router.put("/update/:id", verifyToken, AdminController.updateAdmin);   // Protected
router.delete("/delete/:id", verifyToken, AdminController.deleteAdmin); // Protected

module.exports = router;