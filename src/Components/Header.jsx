import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import './Style/Header.css'

function Header() {
  return (
    <header>

      <Link to={'/'}><h1> Punny Palate</h1></Link>
      
      <nav>
        <ul>
          <li><NavLink to={'/'} className="hover-underline-animation">Home</NavLink></li>
          <li><NavLink to={'/recipes'} className="hover-underline-animation">Recipies</NavLink></li>
          <li><NavLink to={'/addRecipe'} className="hover-underline-animation">Add new recipe</NavLink></li>
        </ul>
      </nav>


    </header>
  );
}

export default Header;