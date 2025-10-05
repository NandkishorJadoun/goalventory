const { Router } = require("express");
const categoriesController = require("../controllers/categoriesController");

const categoriesRouter = Router();

categoriesRouter.get("/", categoriesController.getAllCategories);
categoriesRouter.get(
  "/:categoryId/players",
  categoriesController.getPlayersByCategory,
);

categoriesRouter.get("/new", categoriesController.addCategoryGet);
categoriesRouter.post("/new", categoriesController.addCategoryPost);

categoriesRouter.get("/:categoryId/update", categoriesController.updateCategoryGet);

categoriesRouter.post("/:categoryId/update", categoriesController.updateCategoryPost);

module.exports = categoriesRouter;
