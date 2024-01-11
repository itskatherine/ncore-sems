const db = require("./db/connection");

const selectOwners = () => {
  return db.query(`SELECT * FROM owners`).then((response) => {
    return response.rows;
  });
};

module.exports = { selectOwners };
