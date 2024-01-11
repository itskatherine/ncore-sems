const formatOwnerData = (ownersData) => {
  const formattedOwnerData = [];
  ownersData.forEach((owner) => {
    formattedOwnerData.push([owner.owner_name, owner.pokedollars_earned]);
  });
  return formattedOwnerData;
};

const makeLookUpTable = (data, key, value) => {
  const lookUpTable = {};
  data.forEach((elem) => {
    lookUpTable[elem[key]] = elem[value];
  });
  return lookUpTable;
};

const formatPokemonData = (pokemonData, lookUpTable) => {
  const formattedPokemonData = [];
  pokemonData.forEach((pokemon) => {
    formattedPokemonData.push([
      pokemon.pokemon_name,
      pokemon.battles_won,
      lookUpTable["owner_name"],
    ]);
  });
  return formattedPokemonData;
};

module.exports = { formatOwnerData, makeLookUpTable, formatPokemonData };
