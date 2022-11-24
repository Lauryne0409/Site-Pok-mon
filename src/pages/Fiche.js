import React, { useEffect, useRef, useState } from "react";
import axios from "axios"
import Navigation from '../components/Navigation';
import { useParams } from 'react-router-dom'
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis } from 'recharts';
import { NavLink } from "react-router-dom";



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
    const [evolution, setEvo] = useState ([]);

    useEffect(() => {
        axios
            .get('https://pokeapi.co/api/v2/pokemon-species/'+id)
            .then((res) => {
                setSpecies(res.data)
                axios
                    .get(res.data && res.data.evolution_chain.url)
                    .then((ret)=> {
                        setEvo(ret.data)
                    });
            })
             
    }, [])

    let typeDeux=undefined;
    let degas=undefined ;
    if(pokemon.types && pokemon.types.length==2){
        typeDeux=pokemon.types[1].type.name
        degas=pokemon.types && getDegaType([ pokemon.types[0].type.name, pokemon.types[1].type.name])
    }else{
        degas=pokemon.types && getDegaType([ pokemon.types[0].type.name ])
    }

    const dataState=[
        {subject:"PV", A:pokemon.stats && pokemon.stats[0].base_stat,fullMark: 255},
        {subject:"Attaque", A:pokemon.stats && pokemon.stats[1].base_stat,fullMark: 255},
        {subject:"Défence", A:pokemon.stats && pokemon.stats[2].base_stat,fullMark: 255},
        {subject:"Attaque-Spé", A:pokemon.stats && pokemon.stats[3].base_stat,fullMark: 255},
        {subject:"Défence-Spé", A:pokemon.stats && pokemon.stats[4].base_stat,fullMark: 255},
        {subject:"Vitesse", A:pokemon.stats && pokemon.stats[5].base_stat,fullMark: 255}]
    
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
                <button className="e"> test </button>
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
                    
                        <RadarChart
                            cx={300}
                            cy={250}
                            outerRadius={150}
                            width={500}
                            height={500}
                            data={dataState}
                        >
                        <PolarGrid />
                        <PolarAngleAxis dataKey="subject" stroke="#eeeeee" fill="#eeeeee" />
                        <PolarRadiusAxis />
                        <Radar
                            name="State de Base"
                            dataKey="A"
                            isAnimationActive={true}
                            stroke="#383bf0"
                            fill="#383bf0"
                            fillOpacity={0.6}
                        />
                        </RadarChart>
                    </div>

                    <br/>

                    <div className="evolution">

                        <NavLink to={evolution.chain && '/pokemon/'+getID( evolution.chain.species.url)}>
                            <img 
                                src={ evolution.chain && 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+ getID( evolution.chain.species.url)+'.png'} 
                            />
                        </NavLink>

                        <h2>{evolution.chain && evolution.chain.species.name}</h2> 
                        <h3>Niveau :{evolution.chain && evolution.chain.evolves_to[0].evolution_details[0].min_level}</h3>

                        <NavLink to={evolution.chain && '/pokemon/'+getID( evolution.chain.evolves_to[0].species.url)}>
                            <img 
                                src={ evolution.chain && 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+ getID( evolution.chain.evolves_to[0].species.url)+'.png'} 
                            />
                        </NavLink>

                        <h2>{evolution.chain && evolution.chain.evolves_to[0].species.name}</h2> 
                        <h3>Niveau :{evolution.chain && evolution.chain.evolves_to[0].evolves_to[0].evolution_details[0].min_level}</h3>

                        <NavLink to={evolution.chain && '/pokemon/'+getID( evolution.chain.evolves_to[0].evolves_to[0].species.url)}>
                            <img 
                                src={ evolution.chain && 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+ getID( evolution.chain.evolves_to[0].evolves_to[0].species.url)+'.png'} 
                            />
                        </NavLink>
                        <h2>{evolution.chain && evolution.chain.evolves_to[0].evolves_to[0].species.name}</h2> 
                    </div>

                    <br/>

                    <div className="degas">
                            <h4 id="dega" ></h4>
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

function getID(str){
    const words = str.split('/');
    return words[6]  
}

function getDegaType(types){

    var type = new Map();
    type.set("normal", [1,1,1,1,1,1,2,1,1,1,1,1,1,0,1,1,1,1]);

    type.set("fire", [1,0.5,2,0.5,1,0.5,2,1,2,1,1,0.5,2,1,1,1,0.5,0.5]);

    type.set("water", [1,0.5,0.5,2,2,0.5,1,1,1,1,1,1,1,1,1,1,0.5,1]);

    type.set("grass", [1,2,0.5,0.5,0.5,2,1,2,0.5,2,1,2,1,1,1,1,1,1]);

    type.set("electric", [1,1,1,1,0.5,1,1,1,2,0.5,1,1,1,1,1,1,0.5,1]);

    type.set("ice", [1,2,1,1,1,0.5,2,1,1,1,1,1,2,1,1,1,2,1]);

    type.set("fighting", [1,1,1,1,1,1,1,1,1,2,2,0.5,0.5,1,1,0.5,1,2]);

    type.set("poison", [1,1,1,0.5,1,1,0.5,0.5,2,1,2,0.5,1,1,1,1,1,0.5]);

    type.set("ground", [1,1,2,2,0,2,1,0.5,1,1,1,1,0.5,1,1,1,1,1]);

    type.set("flying", [1,1,1,0.5,2,2,0.5,1,0,1,1,0.5,2,1,1,1,1,1]);

    type.set("psychic", [1,1,1,1,1,1,0.5,1,1,1,0.5,2,1,2,1,2,1,1]);

    type.set("bug", [1,2,1,0.5,1,1,0.5,1,0.5,2,1,1,2,1,1,1,1,1]);

    type.set("rock", [0.5,0.5,2,2,1,1,2,0.5,2,0.5,1,1,1,1,1,1,2,1]);

    type.set("ghost", [0,1,1,1,1,1,0,0.5,1,1,1,0.5,1,2,1,2,1,1]);

    type.set("dragon", [1,0.5,0.5,0.5,0.5,2,1,1,1,1,1,1,1,1,2,1,1,2]);

    type.set("dark", [1,1,1,1,1,1,2,1,1,1,0,2,1,0.5,1,0.5,1,2]);

    type.set("steel", [0.5,2,1,0.5,1,0.5,2,0,2,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5,0.5]);

    type.set("fairy", [1,1,1,1,1,1,0.5,2,1,1,1,0.5,1,1,0,0.5,2,1]);

    var ret = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1];
    var lesType = ["normal","fire","water","grass","electric","ice","fighting","poison","ground","flying","psychic","bug","rock","ghost","dragon","dark", "steel","fairy"]
    for (let y = 0; y < types.length; y++) {
        for (let index = 0; index < 17; index++) {
            ret[index] = ret[index]*type.get(types[y])[index]
        }
    } 
    const element = document.getElementById("dega");
    element.innerHTML = "New Heading";
    var texte = ""
    for (let y = 0; y < ret.length; y++) {
       texte=texte+"<h4>"+lesType[y]+" : "+ret[y]+"</h4>"
    }
    
    element.innerHTML = texte;
    return texte

}

export default Fiche;