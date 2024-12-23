const express = require("express");
const router = express.Router();

const { DepartmentController } = require("../controller");

// Routes
router.post("/add-departments", DepartmentController.createDepartment);
router.get("/all-departments", DepartmentController.getAllDepartments);
router.get("/departments/:id", DepartmentController.getDepartmentById);
router.put("/departments/:id", DepartmentController.updateDepartment);
router.delete("/departments/:id", DepartmentController.deleteDepartment);

module.exports = router;
