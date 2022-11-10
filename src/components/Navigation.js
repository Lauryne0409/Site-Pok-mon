import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <div className="header">
            <div className="navigation">
            <nav>
                <ul>
                    <NavLink to="/" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Pokémon forme normal</li>
                    </NavLink>
                    <NavLink to="/about" className={(nav) => (nav.isActive ? "nav-active" : "")}>
                        <li>Pokémon forme shiny</li>
                    </NavLink>
                </ul>
                </nav>
                <h1>Pokémon</h1>
            </div>
        </div>
    );
};

export default Navigation;