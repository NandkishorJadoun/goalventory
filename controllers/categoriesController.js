const db = require("../db/query");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render("categories", { categories });
}

async function getPlayersByCategory(req, res) {
  const { categoryName } = req.params;
  const players = await db.getPlayersByCategory(categoryName);
  res.render("playersByCategory", { players, categoryName });
}

async function addCategoryGet(req, res) {
  res.render("addCategoryForm");
}

async function addCategoryPost(req, res) {
  const { categoryName } = req.body;
  await db.insertNewCategory(categoryName);
  res.redirect("/categories");
}

module.exports = {
  getAllCategories,
  getPlayersByCategory,
  addCategoryGet,
  addCategoryPost,
};
