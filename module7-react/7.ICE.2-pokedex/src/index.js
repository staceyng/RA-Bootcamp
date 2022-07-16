import "./styles.scss";
import Pokemon from "./pokemon.jsx";
import React from "react";
import { createRoot } from "react-dom/client";
import pokemon from "./pokedex.json";

// console.log(pokemon.pokedex);
const slicedPokemon = pokemon.pokedex.slice(0, 1);
console.log(slicedPokemon);
console.log(slicedPokemon[0].names.en);

const myEl = (
  <div>
    <h1>Pokedex!</h1>
    <ul>{Pokemon(slicedPokemon)}</ul>
  </div>
);

// Create root element to render other elements into, add root element to DOM.
const rootElement = document.createElement("div");
document.body.appendChild(rootElement);

// Create React root component with root DOM element
const rootComponent = createRoot(rootElement);

// Render the myEl JSX element in the root component
rootComponent.render(myEl);
