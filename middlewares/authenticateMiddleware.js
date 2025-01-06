// middlewares/authenticateMiddleware.js

const { ApiKey } = require('../models'); // Adjust the path if needed

const validateApiKey = async (req, res, next) => {
    const apiKey = req.header('Authorization')?.split(' ')[1]; // Example: 'Bearer <API_KEY>'

    if (!apiKey) {
        return res.status(401).json({ status: false, message: 'API key is missing' });
    }

    try {
        // Find the API key document in the database and ensure it's active
        const apiKeyDoc = await ApiKey.findOne({ key: apiKey, isActive: true });

        if (!apiKeyDoc) {
            return res.status(401).json({ status: false, message: 'Invalid or inactive API key' });
        }

        // Store the API key document in the request object for later use
        req.apiKeyDoc = apiKeyDoc;
        
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error('Error validating API key:', error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

module.exports = validateApiKey;
