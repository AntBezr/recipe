import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Style/Header.css";

function Header() {
  return (
    <header>
      <div className="width">
        <Link to={"/"}>
          <h1> Punny Palate</h1>
        </Link>

        <nav>
          <ul>
            <li>
              <NavLink
                activeclassname="active"
                to={"/"}
                className="hover-underline-animation"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                activeclassname="active"
                to={"/recipes"}
                className="hover-underline-animation"
              >
                Recipies
              </NavLink>
            </li>
            <li>
              <NavLink
                activeclassname="active"
                to={"/addRecipe"}
                className="hover-underline-animation"
              >
                Add new recipe
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
