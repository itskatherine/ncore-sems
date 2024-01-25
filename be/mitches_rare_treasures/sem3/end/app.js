const { getPokemon } = require("./app.controllers");
const express = require("express");
const app = express();

app.get("/api/pokemon", getPokemon);

app.use((err, req, res, next) => {
  if (err.msg && err.status) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: "WUH OH" });
});

module.exports = app;
