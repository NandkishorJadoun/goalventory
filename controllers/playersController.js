const db = require("../db/query");
const { Categories, Players, Leagues } = require("../db/query");
const { validationResult } = require("express-validator");
const {
  validateAddPlayer,
  validateUpdatePlayer,
  validateDeletePlayer,
} = require("../middleware/validator");

async function getAllPlayers(req, res) {
  const players = await Players.findAll();
  res.render("players", { players: players });
}

async function addPlayerGet(req, res) {
  const categories = await Categories.findAll();
  const leagues = await Leagues.findAll();

  res.render("addPlayerForm", { categories, leagues });
}

const addPlayerPost = [
  validateAddPlayer,
  async (req, res) => {
    const errors = validationResult(req);
    const { playerName, categoryId, leagueId } = req.body;

    if (!errors.isEmpty()) {
      const categories = await Categories.findAll();
      const leagues = await Leagues.findAll();

      return res.status(400).render("addPlayerForm", {
        errors: errors.array(),
        playerName,
        categories,
        leagues,
      });
    }

    await Players.insert(playerName, categoryId, leagueId);
    res.redirect("/players");
  },
];

async function updatePlayerGet(req, res) {
  const { id } = req.params;
  const categories = await Categories.findAll();
  const leagues = await Leagues.findAll();
  const player = await Players.findById(id);

  console.log(player)

  res.render("updatePlayerForm", { player, categories, leagues });
}
 
const updatePlayerPost = [
  validateUpdatePlayer,
  async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const categories = await Players.findAll();
      const leagues = await Leagues.findAll();
      const player = await Categories.findById(id);

      return res.status(400).render("updatePlayerForm", {
        player,
        categories,
        leagues,
        errors: errors.array(),
      });
    }

    const { playerName, categoryId, leagueId } = req.body;
    await Players.update(id, playerName, categoryId, leagueId);
    res.redirect("/players");
  },
];

async function deletePlayerGet(req, res) {
  const { id } = req.params;
  const player = await Players.findById(id);
  res.render("deletePlayerForm", { player });
}

const deletePlayerPost = [
  validateDeletePlayer,
  async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const player = await Players.findById(id);
      return res
        .status(400)
        .render("deletePlayerForm", { player, errors: errors.array() });
    }
    await Players.delete(id);
    res.redirect("/players");
  },
];

module.exports = {
  getAllPlayers,
  addPlayerGet,
  addPlayerPost,
  updatePlayerGet,
  updatePlayerPost,
  deletePlayerGet,
  deletePlayerPost,
};
