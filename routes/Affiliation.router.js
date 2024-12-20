const express = require('express');
const router = express.Router();
const {AffiliationController} = require('../controller');

// Create a new affiliation
router.post('/add-affiliation', AffiliationController.createAffiliation);

// Get all affiliations
router.get('/all-affiliation', AffiliationController.getAllAffiliations);

// Get a single affiliation by ID
router.get('/:id', AffiliationController.getAffiliationById);

// Update an affiliation by ID
router.put('/:id', AffiliationController.updateAffiliation);

// Soft delete an affiliation by ID
router.delete('/:id', AffiliationController.deleteAffiliation);

module.exports = router;
