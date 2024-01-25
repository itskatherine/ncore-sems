const db = require("./db/connection");

const selectPokemon = (owner_name, sort_by = "pokemon_name", order = "ASC") => {
  let whereString = "";
  const queryVals = [];
  if (owner_name) {
    whereString = "WHERE owner_name = $1";
    queryVals.push(owner_name);
  }

  const validSortBys = ["pokemon_name", "battles_won", "type"];
  const validOrders = ["ASC", "DESC"];

  if (!validSortBys.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: "Invalid sort query" });
  }
  if (!validOrders.includes(order)) {
    return Promise.reject({ status: 400, msg: "Invalid order query" });
  }

  const queryString = `
  SELECT * 
  FROM pokemon 
  JOIN owners ON owners.owner_id = pokemon.owner_id 
  ${whereString}
  ORDER BY ${sort_by} ${order};
  `;
  return db.query(queryString, queryVals).then((response) => {
    return response.rows;
  });
};

module.exports = { selectPokemon };
