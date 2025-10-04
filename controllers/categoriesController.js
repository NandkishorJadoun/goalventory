const db = require("../db/query");

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.send(categories);
}

async function getPlayersByCategory(req, res) {
  const { categoryName } = req.params;
  const players = await db.getPlayersByCategory(categoryName);
  res.send(players);
}

module.exports = {
  getAllCategories,
  getPlayersByCategory,
};
