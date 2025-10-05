const { Router } = require("express");
const playersController = require("../controllers/playersController");

const playersRouter = Router();

playersRouter.get("/", playersController.getAllPlayers);
playersRouter.get("/new", playersController.addPlayerGet);
playersRouter.post("/new", playersController.addPlayerPost);

module.exports = playersRouter;
