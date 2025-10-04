const db = require("../db/query");

async function getAllPlayers(req, res) {
  const players = await db.getAllPlayers();
  res.render("players", { players: players });
}

module.exports = {
  getAllPlayers,
};
