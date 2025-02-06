const  { ApiKey } = require('../models'); // Your API key model

// Controller function to create an API key
const createApiKey = async (req, res) => {
  const { key, purpose, description, owner, permissions } = req.body;

  // Validate the input data
  if (!key || !purpose || !owner) {
    return res.status(400).json({ message: 'Key, purpose, and owner are required fields' });
  }

  try {
    // Create a new API key document
    const newApiKey = new ApiKey({
      key,
      purpose,
      description,
      owner,
      permissions,
    });

    // Save the API key to the database
    await newApiKey.save();

    // Send the response
    res.status(201).json({
      message: 'API key created successfully',
      apiKey: newApiKey,
    });
  } catch (error) {
    console.error('Error creating API key:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  createApiKey,
};
