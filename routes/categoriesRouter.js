const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.get(
  "/:categoryName/players",
  categoriesController.getPlayersByCategory,
);

categoriesRouter.get("/new", categoriesController.addCategoryGet);
categoriesRouter.post("/new", categoriesController.addCategoryPost);

module.exports = categoriesRouter;
