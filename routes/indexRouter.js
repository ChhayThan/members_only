const { Router } = require("express");

const indexRouter = Router();
const indexController = require("../controllers/indexController");

indexRouter.get("/", indexController.getHome);
indexRouter.get("/sign-up", indexController.getSignUpForm);
indexRouter.post("/sign-up", indexController.handleSignUpPost);
module.exports = indexRouter;
