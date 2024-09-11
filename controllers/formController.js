require("dotenv").config();
const {
  validateSignUp,
  validateJoin,
  validateMessage,
  validateProfileUpdate,
} = require("./validators/formValidation");
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
      if (req.body.admin === process.env.ADMIN) {
        await db.updateAdminStatus(req.user.id);
      }
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

exports.postMessage = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("messageForm", {
        errors: errors.array(),
        user: req.user,
      });
    }

    try {
      await db.insertMessage(req.user, req.body.title, req.body.message);
      res.redirect("/");
    } catch (err) {
      return next(err);
    }
  },
];

exports.postUpdateProfile = [
  validateProfileUpdate,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("profile", {
        errors: errors.array(),
        user: req.user,
      });
    }

    try {
      bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
        if (err) {
          throw new Error(err);
        } else {
          const admin = req.body.admin
            ? req.body.admin === process.env.ADMIN
              ? true
              : false
            : true;
          await db.updateProfile(
            req.user.id,
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            hashedPassword,
            admin
          );
        }
      });
      res.redirect("/profile?updated=true");
    } catch (err) {
      throw new Error(err);
    }
  },
];

// TO DO:
// Add admin view, ability to get admin status and change/update profile
