const db = require("./connection");

function seed({ pokemon, owners }) {
  return db
    .query(`DROP TABLE IF EXISTS pokemon;`)
    .then(() => {
      return db.query(`DROP TABLE IF EXISTS owners;`);
    })
    .then(() => {
      return createOwnersTable();
    });
}
function createOwnersTable() {
  return db.query(`
    CREATE TABLE owners
    (
        owner_id SERIAL PRIMARY KEY,
        owner_name VARCHAR(40)
    )
    `);
}

module.exports = seed;
