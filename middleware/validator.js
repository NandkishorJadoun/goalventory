const { body } = require("express-validator");

const validateAddCategory = [
  body("categoryName")
    .trim()
    .notEmpty()
    .withMessage("Category Name shouldn't be empty")
    .isAlpha("en-IN", { ignore: " " })
    .withMessage("Category Name should only contain letters")
    .isLength({ min: 4, max: 15 })
    .withMessage("Length should be between 4 and 15 characters"),
];

module.exports = {
  validateAddCategory,
};
