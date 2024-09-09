const { getMessages } = require("../utils/getter");

exports.getHome = async (req, res) => {
  try {
    const messages = await getMessages(); // Fetch messages
    console.log(messages);
    res.render("index", { title: "Welcome to ClubStory", messages }); // Render the template
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

exports.getSignUpForm = (req, res) => {
  res.render("sign-up");
};

exports.getLoginForm = (req, res) => {
  const signedUp = req.query.success;
  const auth = req.query.failed;
  res.render("login", { signedUp, auth });
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
  res.render("join", { title: "Join as MM" });
};

exports.getMessageForm = (req, res) => {
  res.render("messageForm", { title: "Message Form" });
};
