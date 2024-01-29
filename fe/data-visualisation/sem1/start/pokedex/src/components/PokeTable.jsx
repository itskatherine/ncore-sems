import { useEffect, useState } from "react";

const PokeTable = () => {
  const [pokeData, setPokeData] = useState([]);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20`)
      .then((response) => response.json())
      .then((body) => {
        const results = body.results;
        const pokemonPromises = results.map((pokemon) =>
          fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`).then(
            (response) => response.json()
          )
        );
        return Promise.all(pokemonPromises);
      })
      .then((allPokemon) => {
        const formattedPokemonData = allPokemon.map((pokemon) => {
          return {
            id: pokemon.id || Math.round(Math.random() * 10000000),
            name: pokemon.name,
            type: pokemon.types[0].type.name,
            weight: pokemon.weight,
            height: pokemon.height,
            move: pokemon.moves[0].move.name,
          };
        });
        setPokeData(formattedPokemonData);
      });
  }, []);

  return (
    <ul>
      {pokeData.map((pokemon) => {
        return (
          <li key={pokemon.id}>
            <h3>{pokemon.name}</h3>
            <p>move: {pokemon.move}</p>
            <p>type: {pokemon.type}</p>
            <p>height: {pokemon.height}</p>
            <p>weight: {pokemon.weight}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default PokeTable;
