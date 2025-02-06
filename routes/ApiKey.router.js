const express = require('express');
const router = express.Router();
const  { ApiKeyController } = require('../controller'); // Import the controller

// POST route to create an API key
router.post('/api-key', ApiKeyController.createApiKey);

module.exports = router;
