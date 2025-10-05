const db = require("../db/query");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("categories", { categories });
}

async function getPlayersByCategory(req, res) {
  const { categoryId } = req.params;
  const players = await db.getPlayersByCategory(categoryId);
  const category = await db.getCategoryById(categoryId);
  res.render("playersByCategory", { players, category });
}

async function addCategoryGet(req, res) {
  res.render("addCategoryForm");
}

async function addCategoryPost(req, res) {
  const { categoryName } = req.body;
  await db.insertNewCategory(categoryName);
  res.redirect("/categories");
}

async function updateCategoryGet(req, res) {
  const { categoryId } = req.params;
  const category = await db.getCategoryById(categoryId);
  res.render("updateCategoryForm", { category });
}

async function updateCategoryPost(req, res) {
  const { categoryId } = req.params;
  const { categoryName } = req.body;

  await db.updateCategory(categoryId, categoryName);

  res.redirect("/categories");
}

module.exports = {
  getAllCategories,
  getPlayersByCategory,
  addCategoryGet,
  addCategoryPost,
  updateCategoryGet,
  updateCategoryPost,
};
