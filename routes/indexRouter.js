const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  render("homepage");
});

module.exports = indexRouter;
