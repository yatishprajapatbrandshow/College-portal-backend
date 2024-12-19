// routes/User.router.js
const express = require('express');
const router = express.Router();

// Import the middleware
const { verifyToken, authenticate } = require('../middlewares/authMiddleware');

// Define your routes here, using the middleware
router.get('/some-protected-route', authenticate, (req, res) => {
  res.send('This is a protected route');
});

module.exports = router;
