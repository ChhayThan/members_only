exports.getHome = (req, res) => {
  res.render("index", { title: "Welcome to ClubStory", user: req.user });
};

exports.getSignUpForm = (req, res) => {
  res.render("sign-up", { user: req.user });
};

exports.getLoginForm = (req, res) => {
  const signedUp = req.query.success;
  const auth = req.query.failed;
  res.render("login", { signedUp, auth, user: req.user });
};

exports.getLogOut = (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.getJoin = (req, res) => {
  console.log(req.user);
  res.render("join", { user: req.user, title: "Join as MM" });
};
