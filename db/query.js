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

async function getPlayersByCategory(categoryName) {
  const { rows } = await pool.query(
    `SELECT players.id, player_name, league_name
    FROM players 
    JOIN categories ON players.category_id = categories.id 
    JOIN leagues ON players.league_id = leagues.id
    WHERE category_name = ($1)`,
    [categoryName],
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

module.exports = {
  getAllPlayers,
  getAllCategories,
  getAllLeagues,
  getPlayersByCategory,
  insertNewPlayer,
  insertNewCategory,
};
