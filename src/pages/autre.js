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

                    <div class="forme">
                        <NavLink to={species.varieties && '/pokemon/'+getID( species.varieties[1].pokemon.url)}>
                            <img 
                                src={ species.varieties && 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+ getID( species.varieties[1].pokemon.url)+'.png'} 
                            />
                        </NavLink>

                        <h2>{species.varieties && species.varieties[1].pokemon.name}</h2> 

                        <NavLink to={species.varieties && '/pokemon/'+getID( species.varieties[2].pokemon.url)}>
                            <img 
                                src={ species.varieties && 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/'+ getID( species.varieties[2].pokemon.url)+'.png'} 
                            />
                        </NavLink>

                        <h2>{species.varieties && species.varieties[2].pokemon.name}</h2> 
                    </div>