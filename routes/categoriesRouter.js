const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.get(
  "/:categoryName/players",
  categoriesController.getPlayersByCategory,
);

module.exports = categoriesRouter;
