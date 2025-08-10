const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const StudentController = require("../controllers/StudentController");

router.post("/", auth(["admin"]), StudentController.createStudent);
router.get("/", auth(["admin"]), StudentController.getStudents);
router.get("/:id", auth(["admin", "student"]), StudentController.getStudent);
router.put("/:id", auth(["admin"]), StudentController.updateStudent);
router.delete("/:id", auth(["admin"]), StudentController.deleteStudent);

module.exports = router;
