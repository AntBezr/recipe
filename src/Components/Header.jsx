import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import './Style/Header.css'

function Header() {
  return (
    <header>

      <Link to={'/'}><h1> Punny Palate</h1></Link>
      
      <nav>
        <ul>
          <li><NavLink to={'/'}>Home</NavLink></li>
          <li><NavLink to={'/recipes'}>Recipies</NavLink></li>
          <li><NavLink to={'/addRecipe'}>Add new recipe</NavLink></li>
        </ul>
      </nav>


    </header>
  );
}

export default Header;