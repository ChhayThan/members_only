const { body } = require("express-validator");
require("dotenv").config();

const validateSignUp = [
  body("first_name")
    .trim()
    .notEmpty()
    .withMessage("First name is required")
    .isAlpha()
    .withMessage("First name must contain only letters")
    .isLength({ max: 50 })
    .withMessage("First name must be at most 50 characters long"),

  body("last_name")
    .trim()
    .notEmpty()
    .withMessage("Last name is required")
    .isAlpha()
    .withMessage("Last name must contain only letters")
    .isLength({ max: 50 })
    .withMessage("Last name must be at most 50 characters long"),

  body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .normalizeEmail(),

  body("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
  body("confirm_password")
    .trim()
    .notEmpty()
    .withMessage("Please confirm your password")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

const validateJoin = [
  body("secret")
    .trim()
    .notEmpty()
    .withMessage("Secret is required")
    .custom((value) => {
      if (value !== process.env.MM_SECRET) {
        throw new Error("Incorrect Secret");
      }
      return true;
    }),
];

const validateMessage = [
  body("message")
    .trim()
    .notEmpty()
    .withMessage("Mumble is required.")
    .isLength({ min: 5 })
    .withMessage("Message must be at least 5 characters long"),
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title can't be empty.")
    .isLength({ max: 100 })
    .withMessage("Title must be at most 100 characters long"),
];

module.exports = { validateSignUp, validateJoin, validateMessage };
