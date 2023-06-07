const User = require("../models/user");

const shortId = require("shortid");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

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
