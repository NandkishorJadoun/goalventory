require("dotenv").config();

const express = require("express");
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const playersRouter = require("./routes/playersRouter");

const app = express();

const assetsPath = path.join(__dirname, "public");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(assetsPath));
app.use(express.urlencoded({ extended: true }));

app.use("/", indexRouter);
app.use("/players", playersRouter);

app.get("/{*splat}", (res, req) => {
  res.status(404).send("Bla bla bla");
});

app.use((err, req, res, next) => {
  res.status(500).send(err);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}...`);
});
