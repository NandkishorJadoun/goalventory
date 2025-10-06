const db = require("../db/query");
const { validationResult } = require("express-validator");
const {
  validateAddPlayer,
  validateUpdatePlayer,
} = require("../middleware/validator");

async function getAllPlayers(req, res) {
  const players = await db.getAllPlayers();
  res.render("players", { players: players });
}

async function addPlayerGet(req, res) {
  const categories = await db.getAllCategories();
  const leagues = await db.getAllLeagues();

  res.render("addPlayerForm", { categories, leagues });
}

const addPlayerPost = [
  validateAddPlayer,
  async (req, res) => {
    const errors = validationResult(req);
    const { playerName, categoryId, leagueId } = req.body;

    if (!errors.isEmpty()) {
      const categories = await db.getAllCategories();
      const leagues = await db.getAllLeagues();

      return res.status(400).render("addPlayerForm", {
        errors: errors.array(),
        playerName,
        categories,
        leagues,
      });
    }

    await db.insertNewPlayer(playerName, categoryId, leagueId);
    res.redirect("/players");
  },
];

async function updatePlayerGet(req, res) {
  const { id } = req.params;
  const categories = await db.getAllCategories();
  const leagues = await db.getAllLeagues();
  const player = await db.getPlayerById(id);

  res.render("updatePlayerForm", { player, categories, leagues });
}

const updatePlayerPost = [
  validateUpdatePlayer,
  async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const player = await db.getPlayerById(id);
      const categories = await db.getAllCategories();
      const leagues = await db.getAllLeagues();

      return res.render("updatePlayerForm", {
        player,
        categories,
        leagues,
        errors: errors.array(),
      });
    }

    const { playerName, categoryId, leagueId } = req.body;
    await db.updatePlayer(id, playerName, categoryId, leagueId);
    res.redirect("/players");
  },
];

module.exports = {
  getAllPlayers,
  addPlayerGet,
  addPlayerPost,
  updatePlayerGet,
  updatePlayerPost,
};
