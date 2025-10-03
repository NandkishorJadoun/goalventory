const db = require("../db/query");

async function getAllPlayers(req, res) {
  const players = await db.getAllPlayers();
  res.send(players);
}

module.exports = {
  getAllPlayers,
};
