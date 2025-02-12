const { PopularCollege } = require('../models');  // Assuming your model file is in models/PopularCollege.js

// CREATE - Add a new college
const createPopularCollege = async (req, res) => {
    try {
        const { img, ...otherFields } = req.body;  // Destructure img field and other fields
        const newCollege = new PopularCollege({ ...otherFields, img: img || [] }); // Assign img array (default to empty array if not provided)
        const savedCollege = await newCollege.save();
        res.status(201).json({ message: 'College added successfully', college: savedCollege });
    } catch (error) {
        res.status(400).json({ message: 'Error adding college', error: error.message });
    }
};

// READ - Get all colleges with optional search and filter
const getPopularColleges = async (req, res) => {
    try {
        const { search, filter, page = 1, limit = 10 } = req.query;

        // Build the search query
        let query = {};

        if (search) {
            query = {
                $or: [
                    { name: { $regex: search, $options: 'i' } },
                    { city: { $regex: search, $options: 'i' } },
                    { state: { $regex: search, $options: 'i' } },
                    { country: { $regex: search, $options: 'i' } },
                    { type: { $regex: search, $options: 'i' } },
                    { courses_offered: { $regex: search, $options: 'i' } },
                    { affiliation: { $regex: search, $options: 'i' } },
                ],
            };
        }

        // Apply filters
        if (filter) {
            const filterObj = JSON.parse(filter); // Filters should be passed as a JSON object
            query = { ...query, ...filterObj };
        }

        // Paginate
        const skip = (page - 1) * limit;
        const colleges = await PopularCollege.find(query).skip(skip).limit(limit);
        const total = await PopularCollege.countDocuments(query);

        res.status(200).json({
            message: 'Colleges retrieved successfully',
            colleges,
            total,
            page,
            totalPages: Math.ceil(total / limit),
        });
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving colleges', error: error.message });
    }
};

// READ - Get a single college by ID
const getPopularCollegeById = async (req, res) => {
    try {
        const college = await PopularCollege.findById(req.params.id);
        if (!college) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json({ college });
    } catch (error) {
        res.status(400).json({ message: 'Error retrieving college', error: error.message });
    }
};

// UPDATE - Update a college by ID
const updatePopularCollege = async (req, res) => {
    try {
        const { img, ...otherFields } = req.body;  // Destructure img field and other fields
        const updatedCollege = await PopularCollege.findByIdAndUpdate(
            req.params.id,
            { ...otherFields, img: img || [] },  // Update img array (default to empty array if not provided)
            { new: true }
        );
        if (!updatedCollege) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json({ message: 'College updated successfully', updatedCollege });
    } catch (error) {
        res.status(400).json({ message: 'Error updating college', error: error.message });
    }
};

// DELETE - Delete a college by ID
const deletePopularCollege = async (req, res) => {
    try {
        const deletedCollege = await PopularCollege.findByIdAndDelete(req.params.id);
        if (!deletedCollege) {
            return res.status(404).json({ message: 'College not found' });
        }
        res.status(200).json({ message: 'College deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting college', error: error.message });
    }
};

module.exports = {
    createPopularCollege,
    getPopularColleges,
    getPopularCollegeById,
    updatePopularCollege,
    deletePopularCollege
}
