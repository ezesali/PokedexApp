import React from "react";

import Pokedex from "./Components/Pokedex/Pokedex";

import "./App.css";

import PokedexLogo from './Assets/pokedexLogo.png';




export default function App() {

  return (
    <div className="App">
      <img style={{padding:'30px'}} alt='PokedexLogo' src={PokedexLogo}/>
      <Pokedex/>
    </div>
  );
}
