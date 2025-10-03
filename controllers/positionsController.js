const db = require("../db/query");

async function getAllPositions(req, res) {
  const positions = await db.getAllPositions();
  res.send(positions);
}

module.exports = {
  getAllPositions,
};
