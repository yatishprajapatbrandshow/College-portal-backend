const { ApiKey } = require('../models'); // Adjust the path if needed

const validateApiKey = async (req, res, next) => {
    // Extract API key from the 'Authorization' header (Bearer <API_KEY>)
    const apiKey = req.header('Authorization')?.split(' ')[1]?.trim(); // Added trim() to remove extra spaces

    console.log('Received API Key:', apiKey); // Debugging log

    // If no API key is found, return an error response
    if (!apiKey) {
        console.log('API key is missing');
        return res.status(401).json({ status: false, message: 'API key is missing' });
    }

    try {
        // Log the query to make sure the correct data is being sent to the database
        console.log('Querying database for:', { key: apiKey, isActive: true });

        // Find the API key document in the database and ensure it's active
        const apiKeyDoc = await ApiKey.findOne({ key: apiKey, isActive: true });

        // Log the result of the query
        console.log('API Key Document:', apiKeyDoc); 

        // Check if the document was found
        if (!apiKeyDoc) {
            console.log('Invalid or inactive API key:', apiKey); // Log the API key that failed
            return res.status(401).json({ status: false, message: 'Invalid or inactive API key' });
        }

        // Store the API key document in the request object for later use
        req.apiKeyDoc = apiKeyDoc;

        // Continue to the next middleware or route handler
        next();
    } catch (error) {
        console.error('Error validating API key:', error); // Log the error
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

module.exports = validateApiKey;
