const express = require("express");
const { signup, signin, logout, requireSignin } = require("../controller/auth");
const { runValidation } = require("../vaildators");
const { signupValidation, signinValidation } = require("../vaildators/auth");
const router = express.Router();
router.post("/signup", signupValidation, runValidation, signup);
router.post("/signin", signinValidation, runValidation, signin);
router.get("/signout", logout);
router.get("/secret", requireSignin, (req, res) => {
  res.json({
    message: " you have scrt",
  });
});

module.exports = router;
