const StatusCode = require("../helper/httpStatusCode");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  // Register only for Admin
  async registerAdmin(req, res) {
    const { username, email, password } = req.body;

    try {
      const existing = await User.findOne({
        $or: [{ email }, { username }],
      });

      if (existing) {
        return res
          .status(StatusCode.BadRequest)
          .json({ message: "Admin already exists" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAdmin = await User.create({
        username,
        email,
        password: hashedPassword,
        role: "admin",
      });

      res
        .status(StatusCode.Created)
        .json({ message: "Admin registered successfully", admin: newAdmin });
    } catch (err) {
      res.status(StatusCode.ServerError).json({ message: err.message });
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
        return res
          .status(StatusCode.Unauthorized)
          .json({ message: "Invalid credentials" });
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
      res.status(StatusCode.ServerError).json({ message: "Server error" });
    }
  }

  async resetPassword(req, res) {
    const { identifier, newPassword } = req.body;

    try {
      const user = await User.findOne({
        $or: [{ email: identifier }, { username: identifier }],
      });

      if (!user) {
        return res
          .status(StatusCode.NotFound)
          .json({ message: "User not found" });
      }

      const hashed = await bcrypt.hash(newPassword, 10);
      user.password = hashed;
      await user.save();

      res
        .status(StatusCode.Created)
        .json({ message: "Password reset successful" });
    } catch (error) {
      console.error("Password reset error:", error);
      res
        .status(StatusCode.ServerError)
        .json({ message: "Server error during password reset" });
    }
  }
}

module.exports = new AuthController();
