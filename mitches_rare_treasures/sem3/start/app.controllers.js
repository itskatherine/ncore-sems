const { selectOwners } = require("./app.models");

const getOwners = (request, response) => {
  selectOwners().then((owners) => {
    response.status(200).send({ owners });
  });
};

module.exports = { getOwners };
