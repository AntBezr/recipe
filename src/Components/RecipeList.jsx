import React from "react";
import Card from "./UI/Card";
import { useState, useEffect } from "react";
import axios from "axios";
import Loader from "./UI/Loader";
import "./Style/RecipeList.css";

function RecipeList(props) {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSeatchInput] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
    axios.get("http://localhost:4001/recipes").then((res) => {
      setRecipes(res.data);
    });
    setIsLoding(false);
  }, []);

  const inputSearchHandler = (e) => {
    setSeatchInput(e.target.value.toLowerCase());
  };

  const searchFilter = recipes.filter((recipe) => {
    return recipe.name.toUpperCase().includes(searchInput.toUpperCase());
  });

  if (isLoding) {
    return <Loader />;
  }

  return (
    <div className="mainList">
      <div className="search">
        <label htmlFor="search">Recipes A-Z</label>
        <input type="text" id="search" onChange={inputSearchHandler} />
      </div>

      <div className="template">
        {searchFilter.map((item) => {
          return (
            <Card
              id={item.id}
              key={item.name}
              name={item.name}
              country={item.country}
              image={item.image}
            />
          );
        })}
      </div>
    </div>
  );
}

export default RecipeList;
