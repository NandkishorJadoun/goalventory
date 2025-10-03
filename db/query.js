const pool = require("./pool");

async function getAllPlayers(req, res) {
  const { rows } = await pool.query("SELECT * FROM players");
  return rows;
}

module.exports = {
  getAllPlayers,
};
