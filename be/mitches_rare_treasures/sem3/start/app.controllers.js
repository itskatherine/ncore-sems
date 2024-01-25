const { selectPokemon } = require("./app.models");

const getPokemon = (request, response, next) => {
  selectPokemon()
    .then((pokemon) => {
      response.status(200).send({ pokemon });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = { getPokemon };
