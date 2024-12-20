const express = require("express");

const router = express.Router();

const { ProgramController } = require("../controller");

router.post("/add", ProgramController.createProgram);
router.put("/update/:id", ProgramController.updateProgram);
router.delete("/delete/:id", ProgramController.deleteProgram);
router.get("/get-by-id", ProgramController.getProgramById);
router.get("/get/all-programs", ProgramController.getAllPrograms);

module.exports = router;
