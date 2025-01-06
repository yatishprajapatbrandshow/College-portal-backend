const mongoose = require('mongoose');
const { Schema } = mongoose;

const apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true,
        minlength: 32, // Minimum length for security
        maxlength: 64, // Maximum length for security
        trim: true // Trim whitespace from the key
    },
    purpose: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 1000 // Maximum length for description
    },
    owner: {
        type: String,
        required: true
    },
    permissions: [{
        type: String,
        enum: ['read', 'write', 'admin'], // Example permissions
        default: 'read' // Default permission level
    }],
    isActive: {
        type: Boolean,
        default: true // Indicates if the API key is active
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// Indexes for improved performance
apiKeySchema.index({ key: 1, owner: 1 });

// Pre-save hook to update updatedAt timestamp
apiKeySchema.pre('save', function (next) {
    this.updatedAt = new Date();
    next();
});

// Virtual field to display key with masking for security
apiKeySchema.virtual('maskedKey').get(function () {
    return this.key.substring(0, 8) + '';
});

// Ensure virtuals are included when converting to JSON
apiKeySchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('ApiKey', apiKeySchema);