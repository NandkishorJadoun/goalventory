const { Categories, Players } = require("../db/query");
const { validationResult } = require("express-validator");
const {
  validateAddCategory,
  validateUpdateCategory,
  validateDeleteCategory,
} = require("../middleware/validator");

async function getAllCategories(req, res) {
  const categories = await Categories.findAll();
  res.render("categories", { categories });
}

async function getPlayersByCategory(req, res) {
  const { categoryId } = req.params;
  const players = await Players.findByCategory(categoryId);
  const category = await Categories.findById(categoryId);
  res.render("playersByCategory", { players, category });
}

async function addCategoryGet(req, res) {
  res.render("addCategoryForm");
}

const addCategoryPost = [
  validateAddCategory,
  async (req, res) => {
    const errors = validationResult(req);
    const { categoryName } = req.body;

    if (!errors.isEmpty()) {
      return res
        .status(400)
        .render("addCategoryForm", { errors: errors.array(), categoryName });
    }

    await Categories.insert(categoryName);
    res.redirect("/categories");
  },
];

async function updateCategoryGet(req, res) {
  const { categoryId } = req.params;
  const category = await Categories.findById(categoryId);
  res.render("updateCategoryForm", { category });
}

const updateCategoryPost = [
  validateUpdateCategory,
  async (req, res) => {
    const { categoryName } = req.body;
    const { categoryId } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const category = await Categories.findById(categoryId);
      return res
        .status(400)
        .render("updateCategoryForm", { category, errors: errors.array() });
    }

    await Categories.update(categoryId, categoryName);
    res.redirect("/categories");
  },
];

async function deleteCategoryGet(req, res) {
  const { categoryId } = req.params;
  const category = await Categories.findById(categoryId);
  res.render("deleteCategoryForm", { category });
}

const deleteCategoryPost = [
  validateDeleteCategory,
  async (req, res) => {
    const { categoryId } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const category = await Categories.findById(categoryId);
      return res
        .status(400)
        .render("deleteCategoryForm", { category, errors: errors.array() });
    }

    await Categories.delete(categoryId);
    res.redirect("/categories");
  },
];

module.exports = {
  getAllCategories,
  getPlayersByCategory,
  addCategoryGet,
  addCategoryPost,
  updateCategoryGet,
  updateCategoryPost,
  deleteCategoryGet,
  deleteCategoryPost,
};
