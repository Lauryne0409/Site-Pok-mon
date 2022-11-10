import React, { useEffect, useState } from "react";
import CardS from './CardShiny';
import axios from "axios"

const Pokemons = () => {
    const [data, setData] = useState ([]);
    const [rangeValue, setRangeValue]= useState (35)
    const [search, setSearch] = useState("code");
    const [sortP, setSort] = useState(null);

    useEffect(() => {
        axios
            .get(`https://pokeapi.co/api/v2/pokemon?limit=905`)
            .then((res) => setData(res.data.results));
    }, [search])
    return(
    <div className="form-component">
      <div className="form-container">
        <form>
          <input
            type="text"
            placeholder="Nom Pokémon"
            id="search-input"
            onChange={(e) => setSearch(e.target.value)}
          />
          <input type="submit" value="Rechercher" />
        </form>
        <div className="btn-sort-container">
          <div
            className="btn-sort"
            id="goodToBad"
            onClick={() => setSort("goodToBad")}
          >
            N°<span>➜</span>
          </div>
          <div
            className="btn-sort"
            id="badToGood"
            onClick={() => setSort("badToGood")}
          >
            N°<span>➜</span>
          </div>
        </div>
      </div>
      <div className="pokemons">
      <ul className="radio-container">
                <input 
                    type="range" 
                    min="1" 
                    max="905" 
                    defaultValue={rangeValue} 
                    onChange={(e)=> setRangeValue(e.target.value)}>
                </input>
        </ul>
      <div className="result">
        <div className="pokemonConteneur">
            {data
            .slice(0, rangeValue)
            .sort((a, b) => {
                if (sortP === "goodToBad") {
                return b.index - a.index;
                } else if (sortP === "badToGood") {
                return a.index - b.index;
                }
            })
            .map((pokemons,index) => (
                <CardS index={index+1} pokemons={pokemons} />
            ))}
        </div>
      </div>
      </div>
    </div>
    );
};

export default Pokemons;