// import pokemon from "./pokedex.json";
import React from "react";

function OnePokemon({ pokemon }) {
  console.log(pokemon.pokemon);
  return <h3>Name: {pokemon.names.en}</h3>;
}

function Pokemon(pokemonList) {
  // console.log(pokemonList);

  const listItems = pokemonList.map((p) => (
    <OnePokemon key={p.national_id} pokemon={p} />
  ));
  return listItems;
}

export default Pokemon;
