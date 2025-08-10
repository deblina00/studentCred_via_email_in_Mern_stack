const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  // Register for only Admin
  async registerAdmin(req, res) {
    const { username, email, password } = req.body;

    try {
      const existing = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existing) {
        return res.status(400).json({ message: "Admin already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = await User.create({
        username,
        email,
        password: hashedPassword,
        role: "admin",
      });

      res
        .status(201)
        .json({ message: "Admin registered successfully", admin: newAdmin });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  }

  // Login
  async login(req, res) {
    const { identifier, password } = req.body;

    try {
      const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: user._id, role: user.role },
        process.env.JWT_SECRET
      );

      res.json({
        token,
        user: {
          id: user._id,
          role: user.role,
          email: user.email,
          username: user.username,
        },
      });
    } catch (err) {
      res.status(500).json({ message: "Server error" });
    }
  }

  // Reset Password
  async resetPassword(req, res) {
    const { identifier, newPassword } = req.body;

    try {
      const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
      await user.save();

      res.status(200).json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Password reset error:", error);
      res.status(500).json({ message: "Server error during password reset" });
    }
  }
}

module.exports = new AuthController();
