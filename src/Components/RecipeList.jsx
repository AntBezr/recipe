import React from 'react';
import Card from './UI/Card';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Loader from './UI/Loader';
import './Style/RecipeList.css'



function RecipeList(props) {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSeatchInput] = useState('');
  const [isLoding, setIsLoding] = useState(false);


  useEffect(()=>{
setIsLoding(true)
axios.get("http://localhost:4001/recipes").then(res=>{ setRecipes(res.data)
})
setIsLoding(false)
},[])
  
const Capitalize =(str)=>{
  return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const inputSearchHandler=(e)=>{
    setSeatchInput((e.target.value.toLowerCase()))
  }
  
  const searchFilter = recipes.filter(recipe=>{

    return recipe.name.includes(Capitalize(searchInput))
  
  })
  

  if (isLoding){
    return( 
      <Loader/>
      )
  }

  return (
    <main>
    <div className='search'>
      <label htmlFor="search"  >Recipes A-Z</label>
      <input type="text" id='search'  onChange={inputSearchHandler}/>
      </div>

<div className='template'>
  {searchFilter.map(item=>{
    return(
      <Card
      id={item.id}
      key={item.name}
      name={item.name}
      country={item.country}
      image={item.image}
    
      />
    )
  })}
</div>
    
    </main>
  );
}

export default RecipeList;