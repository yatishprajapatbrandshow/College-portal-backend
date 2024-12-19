const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
    },
    course: {
        type: String,
        required: true,
    },
    enrollmentYear: {
        type: Number,
        required: true,
    },
    lastLogin: {
        type: Date,
    },
    status: {
        type: Boolean,
        default: true,  // Default status as active
    },
    role: {
        type: String,
        required: true,
    },
    verified: {
        type: Boolean,
        default: false,  // Default status as unverified
    },
    deleteflag: { 
        type: Boolean, default: false 
    }
}, { timestamps: true, timeseries: true });

module.exports = mongoose.model('user', userSchema);
