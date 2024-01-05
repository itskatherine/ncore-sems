const db = require("./connection");
const format = require("pg-format");

function seed({ pokemon, owners }) {
  return db
    .query("DROP TABLE IF EXISTS pokemon;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS owners;");
    })
    .then(() => {
      return createOwnersTable();
    })
    .then(() => {
      return createPokemonTable();
    })
    .then(() => {
      return insertOwners(owners);
    });
}

function createOwnersTable() {
  /* Create your owners table in the query below */
  return db.query(`
  CREATE TABLE owners (
    owner_id SERIAL PRIMARY KEY,
    owner_name VARCHAR(40) NOT NULL,
    pokedollars_earned INT NOT NULL
  )
  `);
}

function createPokemonTable() {
  return db.query(`
  CREATE TABLE pokemon (
    pokemon_id SERIAL PRIMARY KEY,
    owner_id INT REFERENCES owners(owner_id),
    pokemon_name VARCHAR(40) NOT NULL,
    battles_won INT NOT NULL
  )
  `);
}

function insertOwners(owners) {
  const preparedOwnerData = owners.map((owner) => {
    return [owner.owner_name, owner.pokedollars_earned];
  });

  const queryString = format(
    `
  INSERT INTO owners 
  (owner_name, pokedollars_earned)
  VALUES
  %L
 `,
    preparedOwnerData
  );
  return db.query(queryString);
}

module.exports = seed;
