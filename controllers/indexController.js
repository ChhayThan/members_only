exports.getHome = (req, res) => {
  res.render("index", { title: "Welcome to ClubStory" });
};
