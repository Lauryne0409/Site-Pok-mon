import React, { useEffect, useState } from "react";
import axios from "axios"
import Navigation from '../components/Navigation';
import { useParams } from 'react-router-dom'



const Fiche = (props) => {
    const { id } = useParams()
    const [data, setData] = useState ([]);
    useEffect(() => {
        axios
            .get('https://pokeapi.co/api/v2/pokemon/'+id)
            .then((res) => setData(res.data));
    }, [])
    console.log(data.name);
    return (
        <div>
            <Navigation />
            <div className="header">
                <h1>N°{id}</h1>
            </div>
            <div className='card' >
            <img 
                src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+id+'.png'} 
                />
                <h2>{data.name}</h2>         
            </div>
        </div>
    );
};

export default Fiche;