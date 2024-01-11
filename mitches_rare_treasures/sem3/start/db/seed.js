const { makeLookUpTable, formatPokemonData } = require("../utils/utils");
const db = require("./connection");
const format = require("pg-format");

function seed({ owners, pokemon }) {
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
    })
    .then((insertedOwners) => {

      const lookUpTable = makeLookUpTable(
        insertedOwners.rows,
        "owner_name",
        "owner_id"
      );
      const formattedPokemonData = formatPokemonData(pokemon, lookUpTable);
      return insertPokemon(formattedPokemonData);
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
    battles_won INT NOT NULL,
    type VARCHAR(40) NOT NULL
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
  RETURNING *
 `,
    preparedOwnerData
  );
  return db.query(queryString);
}

function insertPokemon(pokemon) {
  const preparedPokemonData = pokemon.map((singlePokemon) => {
    return [
      singlePokemon.owner_id,
      singlePokemon.pokemon_name,
      singlePokemon.battles_won,
      singlePokemon.type,
    ];
  });
  const queryString = format(`
  INSERT INTO pokemon
  (owner_id, pokemon_name, battles_won, type)
  `);
}

module.exports = seed;
