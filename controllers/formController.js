const { validateSignUp, validateJoin } = require("./validators/formValidation");
const { validationResult } = require("express-validator");

const bcrypt = require("bcryptjs");
const db = require("../db/query");

exports.handleSignUpPost = [
  validateSignUp,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("sign-up", {
        errors: errors.array(),
      });
    }

    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          throw new Error(err);
        } else {
          await db.insertMember(
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            hashedPassword
          );
        }
      });
      res.redirect("/login?success=true");
    } catch (err) {
      return next(err);
    }
  },
];

exports.postJoin = [
  validateJoin,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("join", {
        errors: errors.array(),
        user: req.user,
      });
    }

    try {
      await db.updateMembershipStatus(req.user.id);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];
