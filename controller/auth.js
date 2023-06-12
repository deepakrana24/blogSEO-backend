const User = require("../models/user");

const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const { expressjwt, ExpressJwtRequest } = require("express-jwt");
// import { expressjwt, ExpressJwtRequest } from "express-jwt";

exports.signup = (req, res) => {
  const { email } = req.body;

  const query = User.where({ email: email });
  query
    .findOne()
    .then((resd) => {
      if (resd) {
        console.log(resd);
        return res
          .status(200)
          .json({ response: `Email ${resd.email} is taken` });
      }

      const { name, email, password } = req.body;
      let username = shortId.generate();
      let profile = `${process.env.CLIENT_URL}/profile/${username}`;

      let newUser = new User({ name, email, password, profile, username });
      newUser
        .save()
        .then((resddd) => {
          res.json({
            message: "Signup success! Please signin.",
            username: username,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: "Signup Fail , please try again ",
          });
        });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};

exports.signin = (req, res) => {
  const { email, password } = req.body;
  const fizz = new User();
  const query = User.where({ email });

  query.findOne().then((response) => {
    if (response == null) {
      return res.status(400).json({
        error: "Email Not Found",
      });
    }
    if (!fizz.authenticate(password, response.hashed_password, response.salt)) {
      return res.status(400).json({
        error: "Email and Password dont match ",
      });
    }

    const token = jwt.sign({ _id: response._id }, process.env.JWT_SCRECT_KEY, {
      expiresIn: "1y",
    });
    res.cookie("token", token, { expiresIn: "1y" });
    const { _id, email, role, profile, username, name } = response;
    res.status(200).json({
      token,
      user: { _id, email, role, profile, username, name },
    });
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({
    message: " Signout is success ",
  });
};

exports.requireSiginController = (req, res) => {
  res.status(200).json({
    message: "you have access to secret page ",
  });
};

exports.requireSignin = expressjwt({
  secret: process.env.JWT_SCRECT_KEY,
  algorithms: ["HS256"], // added later
  userProperty: "auth",
});
