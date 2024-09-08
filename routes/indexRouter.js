const { Router } = require("express");

const indexRouter = Router();
const indexController = require("../controllers/indexController");
const formController = require("../controllers/formController");

indexRouter.get("/", indexController.getHome);
indexRouter.get("/sign-up", indexController.getSignUpForm);
indexRouter.post("/sign-up", formController.handleSignUpPost);
indexRouter.get("/login", indexController.getLoginForm);
indexRouter.get("/logout", indexController.getLogOut);
indexRouter.get("/join", indexController.getJoin);

indexRouter.post("/join", formController.postJoin);

module.exports = indexRouter;
