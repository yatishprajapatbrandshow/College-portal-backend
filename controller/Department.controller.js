const { Department } = require("../models");

// Create a new Department
const createDepartment = async (req, res) => {
  try {
    const { name, short_name, description, departmentCode, status } = req.body;

    // Check if departmentCode already exists
    const existingDepartment = await Department.findOne({ departmentCode });
    if (existingDepartment) {
      return res.status(400).json({
        status: false,
        message: "Department code already exists.",
      });
    }

    // Create a new department
    const department = new Department({
      name,
      short_name,
      description,
      departmentCode,
      status,
    });

    const savedDepartment = await department.save();

    res.status(201).json({
      status: true,
      message: "Department created successfully.",
      data: savedDepartment,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Get all departments
const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find({ deleteflag: false });

    res.status(200).json({
      status: true,
      message: "Departments retrieved successfully.",
      data: departments,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Get department by ID
const getDepartmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);
    if (!department || department.deleteflag) {
      return res.status(404).json({
        status: false,
        message: "Department not found.",
      });
    }

    res.status(200).json({
      status: true,
      message: "Department retrieved successfully.",
      data: department,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Update department by ID
const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, short_name, description, departmentCode, status } = req.body;

    // Check if department exists
    const department = await Department.findById(id);
    if (!department || department.deleteflag) {
      return res.status(404).json({
        status: false,
        message: "Department not found.",
      });
    }

    // Validate unique departmentCode
    if (departmentCode && departmentCode !== department.departmentCode) {
      const duplicate = await Department.findOne({ departmentCode });
      if (duplicate) {
        return res.status(400).json({
          status: false,
          message: "Department code already exists.",
        });
      }
    }

    // Update department fields
    department.name = name || department.name;
    department.short_name = short_name || department.short_name;
    department.description = description || department.description;
    department.departmentCode = departmentCode || department.departmentCode;
    department.status = status !== undefined ? status : department.status;

    const updatedDepartment = await department.save();

    res.status(200).json({
      status: true,
      message: "Department updated successfully.",
      data: updatedDepartment,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

// Soft delete a department
const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;

    const department = await Department.findById(id);
    if (!department || department.deleteflag) {
      return res.status(404).json({
        status: false,
        message: "Department not found.",
      });
    }

    // Perform soft delete
    department.deleteflag = true;
    await department.save();

    res.status(200).json({
      status: true,
      message: "Department deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

module.exports = {
  createDepartment,
  getAllDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
