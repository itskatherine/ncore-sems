const db = require("./db/connection");

const selectPokemon = () => {
  return db.query(`SELECT * FROM POKEMON`).then((response) => {
    return response.rows;
  });
};

module.exports = { selectPokemon };
