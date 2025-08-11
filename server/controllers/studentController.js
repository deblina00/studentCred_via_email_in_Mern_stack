const StatusCode = require("../helper/httpStatusCode");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const sendEmail = require("../utils/sendEmail");

class StudentController {
  async createStudent(req, res) {
    const { username, email, password } = req.body;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const student = await User.create({
        username,
        email,
        password: hashedPassword,
        role: "student",
      });

      // send added students their email with credentials
      await sendEmail(
        email,
        "Welcome to School Portal",
        { username, password },
        "student-credential.html"
      );

      res.status(StatusCode.Created).json(student);
    } catch (err) {
      res.status(StatusCode.BadRequest).json({ message: err.message });
    }
  }

  async getStudents(req, res) {
    try {
      const students = await User.find({ role: "student" }).select("-password");
      res.json(students);
    } catch (err) {
      res.status(StatusCode.ServerError).json({ message: err.message });
    }
  }

  async getStudent(req, res) {
    try {
      const student = await User.findById(req.params.id).select("-password");
      if (!student) {
        return res
          .status(StatusCode.NotFound)
          .json({ message: "Student not found" });
      }
      res.json(student);
    } catch (err) {
      res.status(StatusCode.ServerError).json({ message: err.message });
    }
  }

  async updateStudent(req, res) {
    try {
      const updated = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      }).select("-password");
      res.json(updated);
    } catch (err) {
      res.status(StatusCode.BadRequest).json({ message: err.message });
    }
  }

  async deleteStudent(req, res) {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.json({ message: "Student deleted" });
    } catch (err) {
      res.status(StatusCode.ServerError).json({ message: err.message });
    }
  }
}

module.exports = new StudentController();
