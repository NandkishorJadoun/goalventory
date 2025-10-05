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

async function updatePlayerGet(req, res) {
  const { id } = req.params;
  const categories = await db.getAllCategories();
  const leagues = await db.getAllLeagues();
  const player = await db.getPlayerById(id);

  res.render("updatePlayerForm", { player, categories, leagues });
}

async function updatePlayerPost(req, res) {
  const { id } = req.params;
  const { playerName, categoryId, leagueId } = req.body;
  console.log(id, playerName, categoryId, leagueId);

  await db.updatePlayer(id, playerName, categoryId, leagueId);
  res.redirect("/players");
}

module.exports = {
  getAllPlayers,
  addPlayerGet,
  addPlayerPost,
  updatePlayerGet,
  updatePlayerPost,
};
