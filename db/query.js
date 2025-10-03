const pool = require("./pool");

async function getAllPlayers(req, res) {
  const { rows } = await pool.query(
    `SELECT players.id, players.player_name, position_name, league_name
    FROM players 
    JOIN positions ON players.position_id = positions.id 
    JOIN leagues ON players.league_id = leagues.id`,
  );
  return rows;
}

async function getAllPositions(req, res) {
  const { rows } = await pool.query(`SELECT position_name FROM positions`);
  return rows;
}

module.exports = {
  getAllPlayers,
  getAllPositions,
};
