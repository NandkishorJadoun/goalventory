const { Router } = require("express");
const indexRouter = Router();

indexRouter.get("/", (req, res) => {
  res.render("homepage");
});

module.exports = indexRouter;
