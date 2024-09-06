exports.getHome = (req, res) => {
  res.render("index", { title: "Welcome to ClubStory", user: req.user });
};

exports.getSignUpForm = (req, res) => {
  res.render("sign-up");
};

exports.getLoginForm = (req, res) => {
  const signedUp = req.query.success;
  const auth = req.query.failed;
  res.render("login", { signedUp, auth, user: req.user });
};
