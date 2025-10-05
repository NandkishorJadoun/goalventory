const db = require("../db/query");

async function getAllPlayers(req, res) {
  const players = await db.getAllPlayers();
  res.render("players", { players: players });
}

async function addPlayerGet(req, res) {
  const categories = await db.getAllCategories();
  const leagues = await db.getAllLeagues();

  res.render("addPlayerForm", { categories, leagues });
}

async function addPlayerPost(req, res) {
  const { playerName, categoryId, leagueId } = req.body;
  await db.insertNewPlayer(playerName, categoryId, leagueId);
  res.redirect("/players");
}

module.exports = {
  getAllPlayers,
  addPlayerGet,
  addPlayerPost,
};
