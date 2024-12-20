const express = require("express");

const router = express.Router();

const { UserController } = require("../controller");
const { verifyToken } = require("../middlewares/authMiddleware");

// User routes
router.post("/register", UserController.register);        // Route for user registration
router.post("/login", UserController.login);              // Route for user login
router.put("/update/:id", verifyToken, UserController.updateUser);   // Protected route
router.delete("/delete/:id", verifyToken, UserController.deleteUser); // Protected route

module.exports = router;
