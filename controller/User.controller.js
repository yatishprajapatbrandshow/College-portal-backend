const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken'); 
const { User } = require("../models"); 

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'Brandshow@123'; 

// User Login
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists and is active
    const user = await User.findOne({ email, status: true });
   
    if (!user) {
      return res
        .status(400)
        .json({ status: false, message: "User Not Found or Inactive!", data: false });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, message: "Password Not Match!", data: false });
    }


    // Create JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      JWT_SECRET_KEY,
      { expiresIn: '1h' } 
    );

    // Remove the password field before sending the response
    const userWithoutPassword = { ...user._doc }; 
    delete userWithoutPassword.password;

    return res.status(200).json({
      status: true,
      message: "User Logged In Successfully",
      data: {user:userWithoutPassword , token },
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: false, message: "Server error", data: false });
  }
};

// User Registration
const register = async (req, res) => {
  const { name, email, password, mobile, pincode, course, enrollmentYear, role } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: false,
        message: "User already exists",
        data: false,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      pincode,
      course,
      enrollmentYear,
      role,
      verified: false, 
    });

    await newUser.save();

    res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: false,
      message: "Server error",
      data: false,
    });
  }
};

// Update User Details
const updateUser = async (req, res) => {
  const { id } = req.params; // User ID
  const updates = req.body;

  try {
    // Find the user to update
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        data: false,
      });
    }

    // Update user data
    const updatedUser = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    return res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: false,
    });
  }
};

// Soft Delete User (update status and deleteflag)
const deleteUser = async (req, res) => {
  const { id } = req.params; // User ID

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
        data: false,
      });
    }

    // Soft delete the user
    user.status = false; // Set status to false (inactive)
    user.deleteflag = true; // Set deleteflag to true (mark as deleted)

    await user.save();

    return res.status(200).json({
      status: true,
      message: "User deleted successfully",
      data: false,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Server error",
      data: false,
    });
  }
};

module.exports = {
  login,
  register,
  updateUser,
  deleteUser,
};
