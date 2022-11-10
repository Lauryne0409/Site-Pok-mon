import React from 'react';
import { NavLink } from "react-router-dom";

const Card = (props) => {

    return (
        <NavLink to={'/pokemon/'+props.index}>
            <div className='card' >
                <div className='info'>

                    <img 
                        src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+props.index+'.png'} 
                        alt={'image de '+props.pokemons.name} 
                        />
                    <h2>{props.pokemons.name.charAt(0).toUpperCase()+props.pokemons.name.substr(1)}</h2> 
                    <p>N°{props.index}</p>
                </div>
            </div>
        </NavLink>
    );

    
};

export default Card;