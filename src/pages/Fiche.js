import React, { useEffect, useRef, useState } from "react";
import axios from "axios"
import Navigation from '../components/Navigation';
import { useParams } from 'react-router-dom'



const Fiche = (props) => {
    const { id } = useParams()
    const [pokemon, setPokemon] = useState ([]);
    useEffect(() => {
        axios
            .get('https://pokeapi.co/api/v2/pokemon/'+id)
            .then((res) => {
                setPokemon(res.data)
            });
    }, [])

    const [species, setSpecies] = useState ([]);
    useEffect(() => {
        axios
            .get('https://pokeapi.co/api/v2/pokemon-species/'+id)
            .then((res) => {
                setSpecies(res.data)
            });
    }, [])

    const [evolution, setEvo] = useState ([]);
    useEffect(() => {
        axios
            .get('https://pokeapi.co/api/v2/evolution-chain/'+id)
            .then((res) => {
                setEvo(res.data)
            });
    }, [])

    console.log(evolution && evolution)

    let typeDeux=undefined;
    if(pokemon.types && pokemon.types.length==2){
        typeDeux=pokemon.types[1].type.name
    }

    return (
        <div>
            {pokemon && species &&
            <div >
                <Navigation />
                <div className="header">
                    <h1>N°{id}</h1>
                </div>
                <img 
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+id+'.png'} 
                    />
                <img 
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/'+id+'.png'} 
                    />       
                <h2>{pokemon.name}</h2> 
                <h4>Type : {pokemon.types && pokemon.types[0].type.name} {typeDeux}</h4>
                <h3>Génération : {species.generation && species.generation.name}</h3>
                <div className="info">
                    
                    <br/>

                    <div className="especes">
                        <h4>Taille : {pokemon.height && pokemon.height/10} m</h4>
                        <h4>Poids : {pokemon.weight && pokemon.weight/10} Kg</h4>
                        <h4>Description : {species.flavor_text_entries && species.flavor_text_entries[0].flavor_text}</h4>
                        <h4>Version de la description : {species.flavor_text_entries && species.flavor_text_entries[0].version.name}</h4>
                    </div>

                    <br/>

                    <div className="talent">
                        <h3>Talents : </h3>
                        <h3>{pokemon.abilities && listeTalent(pokemon.abilities)} </h3>
                    </div>

                    <br/>

                    <div className="stats">
                        <h3>Stats de base : </h3>
                        <h4>Pv : {pokemon.stats && pokemon.stats[0].base_stat}</h4>
                        <h4>Attaque : {pokemon.stats && pokemon.stats[1].base_stat}</h4>
                        <h4>Défence : {pokemon.stats && pokemon.stats[2].base_stat}</h4>
                        <h4>Attaque-Spé : {pokemon.stats && pokemon.stats[3].base_stat}</h4>
                        <h4>Défence-Spé : {pokemon.stats && pokemon.stats[4].base_stat}</h4>
                        <h4>Vitesse : {pokemon.stats && pokemon.stats[5].base_stat}</h4>
                        <h3>Total : {pokemon.stats && pokemon.stats[0].base_stat+pokemon.stats[1].base_stat+pokemon.stats[2].base_stat+pokemon.stats[3].base_stat+pokemon.stats[4].base_stat+pokemon.stats[5].base_stat}</h3>
                    </div>

                    <br/>

                    <div className="evolution">

                    </div>
                </div>
            </div>}
        </div>
    );
};

function listeTalent(lesTalent) {
    let ret="";
    lesTalent.forEach(element => {
        ret=ret+" "+element.ability.name
    });
    return ret;
  }
  

export default Fiche;