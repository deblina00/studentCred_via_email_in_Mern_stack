const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/AuthController");

router.post("/login", AuthController.login);
router.post("/register-admin", AuthController.registerAdmin);
router.post("/reset-password", AuthController.resetPassword);

module.exports = router;
