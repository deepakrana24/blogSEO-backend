const User = require("../models/user");

const shortId = require("shortid");

exports.signup = (req, res) => {
  const { name, email, password } = req.body;

  const query = User.where({ name: name, email: email });
  query
    .findOne()
    .then((resd) => {
      if (resd) {
        return res.status(200).json({ response: resd });
      }

      const { name, email, password } = req.body;
      let username = shortId.generate();
      let profile = `${process.env.CLIENT_URL}/profile/${username}`;

      let newUser = new User({ name, email, password, profile, username });
      newUser
        .save()
        .then((resddd) => {
          console.log("auth res", resddd);
          res.json({
            message: "Signup success! Please signin.",
            username: username,
          });
        })
        .catch((err) => {
          return res.status(400).json({
            error: err,
          });
        });
    })
    .catch((err) => {
      return res.status(400).json({
        error: err,
      });
    });
};
