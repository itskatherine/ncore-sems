const db = require("./db/connection");

const selectPokemon = (owner_name, sort_by = "pokemon_name") => {
  let whereString = "";
  const queryVals = [];
  if (owner_name) {
    whereString = "WHERE owner_name = $1";
    queryVals.push(owner_name);
  }

  const validSortBys = ["pokemon_name", "battles_won", "type"];

  if (!validSortBys.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }

  const queryString = `
  SELECT * 
  FROM pokemon 
  JOIN owners ON owners.owner_id = pokemon.owner_id
  ${whereString}
  ORDER BY ${sort_by} ASC;
  `;
  return db.query(queryString, queryVals).then((response) => {
    return response.rows;
  });
};

module.exports = { selectPokemon };
