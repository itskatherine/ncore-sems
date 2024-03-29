/**
 * Create your connection to the DB in this file
 * and remember to export it
 */

const { Pool } = require("pg");

if (!process.env.PGDATABASE) {
  throw new Error("No PGDATABASE configured");
}
console.log(process.env.PGDATABASE);

const pool = new Pool();

module.exports = pool;
