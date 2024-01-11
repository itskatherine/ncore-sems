const { getOwners } = require("./app.controllers");
const express = require("express");
const app = express();

app.get("/api/owners", getOwners);

module.exports = app;
