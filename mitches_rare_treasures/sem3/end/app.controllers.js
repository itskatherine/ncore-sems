const { selectPokemon } = require("./app.models");

const getPokemon = (request, response, next) => {
  const { owner_name, sort_by, order } = request.query;
  selectPokemon(owner_name, sort_by, order)
    .then((pokemon) => {
      response.status(200).send({ pokemon });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getPokemon };
