const { Pool } = require("pg");

const pool = new Pool();

//console.log(process.env.PGDATABASE, "PGDATABASE");

module.exports = pool;
