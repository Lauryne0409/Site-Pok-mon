import React from 'react';

const Card = (props) => {

    return (
        <div className='card' onClick={(e)=> console.log("toucher "+props.index)}>
            <div className='info'>

                <img 
                    src={'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/'+props.index+'.png'} 
                    alt={'image de '+props.pokemons.name} 
                    />
                <h2>{props.pokemons.name.charAt(0).toUpperCase()+props.pokemons.name.substr(1)}</h2> 
                <p>n°{props.index}</p>
            </div>
        </div>
    );

    
};

export default Card;