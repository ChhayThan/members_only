const validateSignUp = require("./validators/signUpValidator");
const { validationResult } = require("express-validator");

exports.getHome = (req, res) => {
  res.render("index", { title: "Welcome to ClubStory" });
};

exports.getSignUpForm = (req, res) => {
  res.render("sign-up");
};

exports.handleSignUpPost = [
  validateSignUp,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
      });
    }
    res.redirect("/login", { title: "Welcome to ClubStory", signedUp: true });
  },
];
