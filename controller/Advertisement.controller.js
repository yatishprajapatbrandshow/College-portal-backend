const  {Advertisement} = require('../models'); 

// Create a new advertisement
 const createAdvertisement = async (req, res) => {
  try {
    const newAd = new Advertisement(req.body);
    await newAd.save();
    res.status(201).json({
      res: true,
      status: 201,
      msg: 'Advertisement created successfully',
      advertisement: newAd
    });
  } catch (error) {
    res.status(400).json({
      res: false,
      status: 400,
      msg: error.message
    });
  }
};

// Get all advertisements
const getAllAdvertisements = async (req, res) => {
  try {
    const advertisements = await Advertisement.find({ deleteflag: false }); // Exclude soft deleted ads
    res.status(200).json({
      res: true,
      status: 200,
      msg: 'Advertisements fetched successfully',
      advertisements: advertisements
    });
  } catch (error) {
    res.status(500).json({
      res: false,
      status: 500,
      msg: error.message
    });
  }
};

// Get a single advertisement by ID
const getAdvertisementById = async (req, res) => {
  try {
    const ad = await Advertisement.findById(req.params.id);
    if (!ad) {
      return res.status(404).json({
        res: false,
        status: 404,
        msg: 'Advertisement not found'
      });
    }
    res.status(200).json({
      res: true,
      status: 200,
      msg: 'Advertisement fetched successfully',
      advertisement: ad
    });
  } catch (error) {
    res.status(500).json({
      res: false,
      status: 500,
      msg: error.message
    });
  }
};

// Update an existing advertisement
const updateAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ad) {
      return res.status(404).json({
        res: false,
        status: 404,
        msg: 'Advertisement not found'
      });
    }
    res.status(200).json({
      res: true,
      status: 200,
      msg: 'Advertisement updated successfully',
      advertisement: ad
    });
  } catch (error) {
    res.status(400).json({
      res: false,
      status: 400,
      msg: error.message
    });
  }
};

// Soft delete an advertisement (set deleteflag to true)
const deleteAdvertisement = async (req, res) => {
  try {
    const ad = await Advertisement.findByIdAndUpdate(req.params.id, { deleteflag: true }, { new: true });
    if (!ad) {
      return res.status(404).json({
        res: false,
        status: 404,
        msg: 'Advertisement not found'
      });
    }
    res.status(200).json({
      res: true,
      status: 200,
      msg: 'Advertisement deleted successfully',
      advertisement: ad
    });
  } catch (error) {
    res.status(500).json({
      res: false,
      status: 500,
      msg: error.message
    });
  }
};

module.exports = {
  createAdvertisement ,
  getAllAdvertisements,
  getAdvertisementById ,
  updateAdvertisement,
  deleteAdvertisement 
};
