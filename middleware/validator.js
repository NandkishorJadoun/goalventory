const { body } = require("express-validator");
require("dotenv").config();

const validateAddCategory = [
  body("categoryName")
    .trim()
    .notEmpty()
    .withMessage("Category Name shouldn't be empty")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Category Name shouldn't contain special characters")
    .isLength({ min: 4, max: 15 })
    .withMessage("Length should be between 4 and 15 characters"),
];

const validateAddPlayer = [
  body("playerName")
    .trim()
    .notEmpty()
    .withMessage("Player Name shouldn't be empty")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Player Name should only contain letters")
    .isLength({ min: 4, max: 20 })
    .withMessage("Length should be between 4 and 20 characters"),
];

const validateUpdateCategory = [
  body("categoryName")
    .trim()
    .notEmpty()
    .withMessage("Category Name shouldn't be empty")
    .isAlphanumeric("en-US", { ignore: " " })
    .withMessage("Category Name shouldn't contain special characters")
    .isLength({ min: 4, max: 15 })
    .withMessage("Length should be between 4 and 15 characters"),
  body("password").custom((value) => {
    if (value !== process.env.PASSWORD) {
      throw new Error("Invalid Password!");
    }
    return true;
  }),
];

const validateUpdatePlayer = [
  body("playerName")
    .trim()
    .notEmpty()
    .withMessage("Player Name shouldn't be empty")
    .isAlpha("en-US", { ignore: " " })
    .withMessage("Player Name should only contain letters")
    .isLength({ min: 4, max: 20 })
    .withMessage("Length should be between 4 and 20 characters"),
  body("password").custom((value) => {
    if (value !== process.env.PASSWORD) {
      throw new Error("Invalid Password!");
    }
    return true;
  }),
];

module.exports = {
  validateAddCategory,
  validateAddPlayer,
  validateUpdateCategory,
  validateUpdatePlayer,
};
