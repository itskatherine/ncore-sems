const { getPokemon } = require("./app.controllers");
const express = require("express");
const app = express();

app.get("/api/pokemon", getPokemon);

// Custom error handler
app.use((err, request, response, next) => {
  if (err.status && err.msg) {
    response.status(err.status).send({ msg: err.msg });
  } else {
    next();
  }
});

// 500 error handler
app.use((err, request, response, next) => {
  console.log(err);
  response.status(500).send({ msg: "500 Internal server error :(" });
});

module.exports = app;
