const { body } = require("express-validator");

const validateAddCategory = [
  body("categoryName")
    .trim()
    .notEmpty()
    .withMessage("Category Name shouldn't be empty")
    .isAlphanumeric({ ignore: " " })
    .withMessage("Category Name shouldn't contain special characters")
    .isLength({ min: 4, max: 15 })
    .withMessage("Length should be between 4 and 15 characters"),
];

const validateAddPlayer = [
  body("playerName")
    .trim()
    .notEmpty()
    .withMessage("Player Name shouldn't be empty")
    .isAlpha("en-IN", { ignore: " " })
    .withMessage("Player Name should only contain letters")
    .isLength({ min: 4, max: 20 })
    .withMessage("Length should be between 4 and 20 characters"),
];

module.exports = {
  validateAddCategory,
  validateAddPlayer,
};
