import React from 'react';
import {Link, NavLink} from 'react-router-dom'
import './Style/Header.css'

function Header() {
  return (
    <header>

      <Link to={'/'}><h1> Punny Palate</h1></Link>
      
      <nav>
        <ul>
          <li><NavLink exact activeClassName="active" to={'/'} className="hover-underline-animation">Home</NavLink></li>
          <li><NavLink activeClassName="active" to={'/recipes'} className="hover-underline-animation">Recipies</NavLink></li>
          <li><NavLink activeClassName="active" to={'/addRecipe'} className="hover-underline-animation">Add new recipe</NavLink></li>
        </ul>
      </nav>


    </header>
  );
}

export default Header;