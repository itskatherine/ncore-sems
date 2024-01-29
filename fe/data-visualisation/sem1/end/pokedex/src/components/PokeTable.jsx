import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const PokeTable = () => {
  const [pokeData, setPokeData] = useState([]);
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=151`)
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
  const columns = [
    { field: "name", headerName: "Name", width: 130 },
    { field: "id", headerName: "ID", width: 40 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "weight", headerName: "Weight", width: 130 },
    {
      field: "move",
      headerName: "Move",
      width: 150,
    },
  ];

  const rows = pokeData;
  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
    </div>
  );
};

export default PokeTable;
