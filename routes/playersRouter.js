const { Router } = require("express");
const playersController = require("../controllers/playersController");

const playersRouter = Router();

playersRouter.get("/", playersController.getAllPlayers);

module.exports = playersRouter;
