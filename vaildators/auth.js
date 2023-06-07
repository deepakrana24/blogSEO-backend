const { check } = require("express-validator");

exports.signupValidation = [
  // check("name").isEmpty().withMessage("name is required"),

  check("email").isEmail().withMessage("Enter vaild Email "),

  check("password")
    .isLength({ min: 6 })
    .withMessage("password must be 6 word "),
];
