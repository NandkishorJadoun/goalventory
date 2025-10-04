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
  const { rows } = await pool.query(`SELECT category_name FROM categories`);
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

module.exports = {
  getAllPlayers,
  getAllCategories,
  getPlayersByCategory,
};
