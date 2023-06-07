const express = require("express");
const { signup } = require("../controller/auth");
const { runValidation } = require("../vaildators");
const { signupValidation } = require("../vaildators/auth");
const router = express.Router();
router.post("/signup", signupValidation, runValidation, signup);

module.exports = router;
