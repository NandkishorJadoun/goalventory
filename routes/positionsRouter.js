const { Router } = require("express");
const positionsController = require("../controllers/positionsController");

const positionsRouter = Router();

positionsRouter.get("/", positionsController.getAllPositions);

module.exports = positionsRouter;
