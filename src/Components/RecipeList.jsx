import React from 'react';
import Card from './UI/Card';
import { useState, useEffect} from 'react';
import axios from 'axios';
import Loader from './UI/Loader';



function RecipeList(props) {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSeatchInput] = useState('');
  const [flag, setFlag] = useState('');
  const [isLoding, setIsLoding] = useState(false);


  useEffect(()=>{
setIsLoding(true)
axios.get("http://localhost:4001/recipes").then(res=>{setRecipes(res.data)
axios.get(`https://restcountries.com/v3.1/name/${recipes.country}`).then(res=>setFlag(res.data))
setIsLoding(false)
})
  },[])
  

  const inputSearchHandler=(e)=>{
    setSeatchInput((e.target.value.toLowerCase()))
  }
  
  const searchFilter = recipes.filter(recipe=>{
    return recipe.name.includes(searchInput)
  
  })
  

  if (isLoding){
    return( 
      <Loader/>
      )
  
  }

  return (
    <div>
      <input type="text" onChange={inputSearchHandler}/>


<div className='template'>
  {searchFilter.map(item=>{
    return(
      <Card
      key={item.name}
      name={item.name}
      country={item.country}
      image={item.image}
      />
    )
  })}
</div>
    </div>
  );
}

export default RecipeList;