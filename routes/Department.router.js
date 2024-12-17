const express = require("express");
const router = express.Router();

const { DepartmentController } = require("../controller");

// Routes
router.post("/departments", DepartmentController.createDepartment);
router.get("/departments", DepartmentController.getAllDepartments);
router.get("/departments/:id", DepartmentController.getDepartmentById);
router.put("/departments/:id", DepartmentController.updateDepartment);
router.delete("/departments/:id", DepartmentController.deleteDepartment);

module.exports = router;
