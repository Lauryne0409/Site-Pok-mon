import React, { useEffect, useState } from "react";
import Card from './Card';
import axios from "axios"

const Pokemons = () => {
    const [data, setData] = useState ([]);
    const [rangeValue, setRangeValue]= useState (35)
    useEffect(() => {
        axios
            .get("https://pokeapi.co/api/v2/pokemon?limit=1154")
            .then((res) => setData(res.data.results));
    }, [])
    return(
        <div className="pokemons">
            <h1>Pokémon</h1>
            <ul className="radio-container">
                <input 
                    type="range" 
                    min="1" 
                    max="1154" 
                    defaultValue={rangeValue} 
                    onChange={(e)=> setRangeValue(e.target.value)}>
                </input>
            </ul>
            <div className="pokemonConteneur">
                {
                    data
                    .slice(0,rangeValue)
                    .map((pokemons,index) => (
                    <Card index={index+1} pokemons={pokemons} />
                    ))
                }
            </div>
        </div>
    );
};

export default Pokemons;