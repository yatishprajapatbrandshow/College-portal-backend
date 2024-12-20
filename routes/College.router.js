const express = require("express");

const router = express.Router();

const { CollegeController } = require("../controller");

router.post("/add-college", CollegeController.createCollege);
router.get("/all-colleges", CollegeController.getAllColleges);
router.get("/colleges/:id", CollegeController.getCollegeById);
router.put("/colleges/:id", CollegeController.updateCollege);
router.delete("/colleges/:id", CollegeController.deleteCollege);

module.exports = router;
