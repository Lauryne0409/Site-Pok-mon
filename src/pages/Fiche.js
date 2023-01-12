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
    if(pokemon.types && pokemon.types.length==2){
        typeDeux=pokemon.types[1].type.name
        pokemon.types && getDegaType([ pokemon.types[0].type.name, pokemon.types[1].type.name])
    }else{
        pokemon.types && getDegaType([ pokemon.types[0].type.name ])
    }

    evolution.chain && getEvolutions(evolution)

    const dataState=[
        {subject:"PV", A:pokemon.stats && pokemon.stats[0].base_stat,fullMark: 255},
        {subject:"Attaque", A:pokemon.stats && pokemon.stats[1].base_stat,fullMark: 255},
        {subject:"Défence", A:pokemon.stats && pokemon.stats[2].base_stat,fullMark: 255},
        {subject:"Attaque-Spé", A:pokemon.stats && pokemon.stats[3].base_stat,fullMark: 255},
        {subject:"Défence-Spé", A:pokemon.stats && pokemon.stats[4].base_stat,fullMark: 255},
        {subject:"Vitesse", A:pokemon.stats && pokemon.stats[5].base_stat,fullMark: 255}]
    
    return (
        <div>
            {pokemon && species && evolution &&
            <div >
                <Navigation />
                <section class="section about-section gray-bg" id="about">
                    <div class="container">
                        <div class="row align-items-center flex-row-reverse">
                            <div class="col-lg-6">
                                <div class="about-text go-to">
                                    <h3 class="titre-color">{pokemon.name}</h3>
                                    <h6 class="theme-color lead">N°{id}</h6>
                                    <p>{species.flavor_text_entries && species.flavor_text_entries[0].flavor_text}</p>
                                    <div class="row about-list">
                                        <div class="col-md-6">
                                            <div class="media">
                                                <label>Type</label>
                                                <p>{pokemon.types && pokemon.types[0].type.name} {typeDeux}</p>
                                            </div>
                                            <div class="media">
                                                <label>Talents</label>
                                                <p>{pokemon.abilities && listeTalent(pokemon.abilities)}</p>
                                            </div>
                                            <div class="media">
                                                <label>Génération</label>
                                                <p>{species.generation && species.generation.name}</p>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="media">
                                                <label>Taille</label>
                                                <p>{pokemon.height && pokemon.height/10} m</p>
                                            </div>
                                            <div class="media">
                                                <label>Poids</label>
                                                <p>{pokemon.weight && pokemon.weight/10} Kg</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6">
                                <div class="about-avatar">
                                <img 
                            src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+id+'.png'} 
                            />
                                </div>
                            </div>
                        </div>


                        <div class="counter-poke">
                            <div class="row">
                                <div class="col-6 col-lg-4">
                                    <div class="count-data text-center">
                                        <h6 class="count h2">{pokemon && pokemon.base_experience}</h6>
                                        <p class="m-0px font-w-600 p-noir">Experience de base</p>
                                    </div>
                                </div>
                                <div class="col-6 col-lg-4">
                                    <div class="count-data text-center">
                                        <h6 class="count h2">{species && species.base_happiness}</h6>
                                        <p class="m-0px font-w-600 p-noir">Bonheur de base</p>
                                    </div>
                                </div>
                                <div class="col-6 col-lg-4">
                                    <div class="count-data text-center">
                                        <h6 class="count h2">{species && species.capture_rate}</h6>
                                        <p class="m-0px font-w-600 p-noir">Taux de capture</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row align-items-center flex-row-reverse">
                            <div class="col-lg-6">
                                <div class="counter-poke">
                                    <div class="row">
                                        <h3 class="dark-color">Stats de base : </h3>
                                        <h4 class="p-noir">Pv : {pokemon.stats && pokemon.stats[0].base_stat}</h4>
                                        <h4 class="p-noir">Attaque : {pokemon.stats && pokemon.stats[1].base_stat}</h4>
                                        <h4 class="p-noir">Défence : {pokemon.stats && pokemon.stats[2].base_stat}</h4>
                                        <h4 class="p-noir">Attaque-Spé : {pokemon.stats && pokemon.stats[3].base_stat}</h4>
                                        <h4 class="p-noir">Défence-Spé : {pokemon.stats && pokemon.stats[4].base_stat}</h4>
                                        <h4 class="p-noir">Vitesse : {pokemon.stats && pokemon.stats[5].base_stat}</h4>
                                        <h3 class="p-noir">Total : {pokemon.stats && pokemon.stats[0].base_stat+pokemon.stats[1].base_stat+pokemon.stats[2].base_stat+pokemon.stats[3].base_stat+pokemon.stats[4].base_stat+pokemon.stats[5].base_stat}</h3>
                                    </div>
                                </div>
                            
                            </div>
                            <div class="col-lg-6">
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
                        </div>
                        

                        <div class="row align-items-center flex-row-reverse">
                            <div class="counter-poke">
                                <div class="row">
                                    <div class="col-6 col-lg-4">
                                        <div class="count-data text-center">
                                            <h2 class="p-noir">Faible contre</h2>
                                            <h6 class="count h2" id="faible"></h6>
                                        </div>
                                    </div>
                                    <div class="col-6 col-lg-4">
                                        <div class="count-data text-center">   
                                            <h2  class="p-noir">Résistant contre</h2>
                                            <h6 class="count h2" id="resistant"></h6>
                                        </div>
                                    </div>
                                    <div class="col-6 col-lg-4">
                                        <div class="count-data text-center">
                                            <h2  class="p-noir">Dégâts normaux</h2>
                                            <h6 class="count h2" id="normaux"></h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </section>
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
    var lesType = ["Normal","Feu","Eau","Plante","Electrik","Glace","Combat","Poisson","Sol","Vol","Psy","Insecte","Roche","Spectre","Dragon","Ténèbre", "Acier","Fée"]

    for (let y = 0; y < types.length; y++) {
        for (let index = 0; index < 17; index++) {
            ret[index] = ret[index]*type.get(types[y])[index]  
        }
    } 
    const faible = document.getElementById("faible");
    const resistant = document.getElementById("resistant");
    const normaux = document.getElementById("normaux");


    var texteFaible = ""
    var texteResistant = ""
    var texteNormaux = ""

    for (let y = 0; y < ret.length; y++) {
        if(ret[y]>=2){
            texteFaible=texteFaible+"<h4>"+lesType[y]+" : x"+ret[y]+"</h4>"
        }else if(ret[y]<1){
            texteResistant=texteResistant+"<h4>"+lesType[y]+" : x"+ret[y]+"</h4>"
        }else{
            texteNormaux=texteNormaux+"<h4>"+lesType[y]+" : x"+ret[y]+"</h4>"
        }
       
    }
    
    faible.innerHTML = texteFaible;
    resistant.innerHTML = texteResistant;
    normaux.innerHTML = texteNormaux;
    return texteFaible

}

function getEvolutions(evolution) {
    let LesEvolution = new Array();
    LesEvolution.push([evolution.chain.species.name,getID(evolution.chain.species.url)])
    if(evolution.chain.evolves_to != ""){
        LesEvolution.push(evolution.chain.evolves_to[0].species && [evolution.chain.evolves_to[0].species.name,getID(evolution.chain.evolves_to[0].species.url)])
    }
    console.log(LesEvolution)
}

export default Fiche;