const pool = require("./pool");

const makeFindAll = (tableName) => {
  return async () => {
    const { rows } = await pool.query(`SELECT * FROM ${tableName}`);
    return rows;
  };
};

const makeFindById = (tableName) => {
  return async (id) => {
    const { rows } = await pool.query(
      `SELECT * FROM ${tableName} WHERE id = ($1)`,
      [id],
    );

    return rows[0];
  };
};

const makeInsert = (tableName, columns) => {
  const jointColumns = columns.join(", ");
  const placeholders = columns.map((ele, index) => `$${index + 1}`).join(", ");

  return async (...data) => {
    await pool.query(
      `INSERT INTO ${tableName} (${jointColumns})
      VALUES (${placeholders})`,
      data,
    );
  };
};

const makeUpdate = (tableName, columns) => {
  const setClause = columns
    .map((ele, idx) => `${ele} = ($${idx + 2})`)
    .join(", ");

  return async (...data) => {
    await pool.query(
      `UPDATE ${tableName}
      SET ${setClause}
      WHERE id = ($1)`,
      data,
    );
  };
};

const Players = {
  findAll: async () => {
    const { rows } = await pool.query(
      `SELECT players.id, player_name, category_name, league_name
    FROM players 
    JOIN categories ON players.category_id = categories.id 
    JOIN leagues ON players.league_id = leagues.id`,
    );
    return rows;
  },
  findByCategory: async (id) => {
    const { rows } = await pool.query(
      `SELECT players.id, player_name, league_name
    FROM players 
    JOIN categories ON players.category_id = categories.id 
    JOIN leagues ON players.league_id = leagues.id
    WHERE categories.id = ($1)`,
      [id],
    );

    return rows;
  },
  findById: makeFindById("players"),
  insert: makeInsert("players", ["player_name", "category_id", "league_id"]),
  update: makeUpdate("players", ["player_name", "category_id", "league_id"]),
  delete: async (id) => {
    await pool.query(`DELETE FROM players WHERE id = ($1)`, [id]);
  },
};

const Categories = {
  findAll: makeFindAll("categories"),
  findById: makeFindById("categories"),
  insert: makeInsert("categories", ["category_name"]),
  update: makeUpdate("categories", ["category_name"]),
  delete: async (id) => {
    await pool.query(`DELETE FROM players WHERE category_id = ($1);`, [id]);
    await pool.query(`DELETE FROM categories WHERE id = ($1)`, [id]);
  },
};

const Leagues = {
  findAll: makeFindAll("leagues"),
};

module.exports = { Categories, Players, Leagues };
