const express = require("express");
const { signup, signin } = require("../controller/auth");
const { runValidation } = require("../vaildators");
const { signupValidation, signinValidation } = require("../vaildators/auth");
const router = express.Router();
router.post("/signup", signupValidation, runValidation, signup);
router.post("/signin", signinValidation, runValidation, signin);

module.exports = router;
