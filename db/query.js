const pool = require("./pool");

async function getAllPlayers() {
  const { rows } = await pool.query(
    `SELECT players.id, player_name, category_name, league_name
    FROM players 
    JOIN categories ON players.category_id = categories.id 
    JOIN leagues ON players.league_id = leagues.id`,
  );
  return rows;
}

async function getAllCategories() {
  const { rows } = await pool.query(`SELECT * FROM categories`);
  return rows;
}

async function getAllLeagues() {
  const { rows } = await pool.query(`SELECT * FROM leagues`);
  return rows;
}

async function getPlayersByCategory(id) {
  const { rows } = await pool.query(
    `SELECT players.id, player_name, league_name
    FROM players 
    JOIN categories ON players.category_id = categories.id 
    JOIN leagues ON players.league_id = leagues.id
    WHERE categories.id = ($1)`,
    [id],
  );

  return rows;
}

async function insertNewPlayer(playerName, categoryId, leagueId) {
  await pool.query(
    `INSERT INTO players (player_name, category_id, league_id)
    VALUES (($1), ($2), ($3))`,
    [playerName, categoryId, leagueId],
  );
}

async function insertNewCategory(categoryName) {
  await pool.query(
    `INSERT INTO categories (category_name)
    VALUES ($1)`,
    [categoryName],
  );
}

async function getPlayerById(id) {
  const { rows } = await pool.query(`SELECT * FROM players WHERE id = ($1)`, [
    id,
  ]);

  return rows[0];
}

async function updatePlayer(...args) {
  await pool.query(
    `UPDATE players
    SET player_name = ($2), category_id = ($3), league_id = ($4) WHERE id = ($1)`,
    args,
  );
}

async function getCategoryById(id) {
  const { rows } = await pool.query(
    `SELECT * FROM categories WHERE id = ($1)`,
    [id],
  );

  return rows[0];
}

module.exports = {
  getAllPlayers,
  getPlayerById,
  getAllCategories,
  getCategoryById,
  getAllLeagues,
  getPlayersByCategory,
  insertNewPlayer,
  insertNewCategory,
  updatePlayer,
};
