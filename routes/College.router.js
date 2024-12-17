const express = require("express");

const router = express.Router();

const { CollegeController } = require("../controller");

router.post("/add-college", CollegeController.createCollege);

module.exports = router;