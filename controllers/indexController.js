exports.getHome = (req, res) => {
  res.render("index", { title: "Welcome to ClubStory" });
};

exports.getSignUpForm = (req, res) => {
  res.render("sign-up");
};

exports.getLoginForm = (req, res) => {
  const signedUp = req.query.success;
  res.render("login", { signedUp });
};
