const { Router } = require("express");
const playersController = require("../controllers/playersController");

const playersRouter = Router();

playersRouter.get("/", playersController.getAllPlayers);
playersRouter.get("/new", playersController.addPlayerGet);
playersRouter.post("/new", playersController.addPlayerPost);
playersRouter.get("/:id/update", playersController.updatePlayerGet);
playersRouter.post("/:id/update", playersController.updatePlayerPost);

playersRouter.get("/:id/delete", playersController.deletePlayerGet);

playersRouter.post("/:id/delete", playersController.deletePlayerPost)

module.exports = playersRouter;
