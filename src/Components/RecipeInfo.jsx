import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Style/RecipeInfo.css'
import Loader from './UI/Loader';
import axios from 'axios';


function RecipeInfo() {
const params = useParams();
const navigate = useNavigate();
const [data, setData] = useState([]);
const [flag, setFlag] = useState('');
const [isLoding, setIsLoading]= useState(false);

useEffect(() => {
  setIsLoading(true);
  
  axios.get(`http://localhost:4001/recipes/${params.id}`)
    .then((res) => {
      setData(res.data);

      axios.get(`https://restcountries.com/v3.1/name/${res.data.country}`)
        .then((res) => setFlag(res.data[0].flags.svg));

      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
    });
}, []);


if(isLoding){
  return(
    <Loader/>
  )
}

  return (
    <main>
    <div>
      <h2>{data.name}</h2>
      <img src={data.image} alt={data.name} />
      <img src={flag} alt="" /> 
      <h3>{data.description}</h3>
      <div className='blok'>
      <h3>Instructions:</h3>
      {data && data.instructions && Array.isArray(data.instructions) && (
        <h4>
          {data.instructions.map((instruction, index) => (
            <span key={index}>
              {instruction} <br />
            </span>
          ))}
        </h4>
      )}

      </div>
      <div className="blok">
      <h3>Ingredients</h3>
      {data && data.ingredients && Array.isArray(data.ingredients) && (
      <h4>{data.ingredients.map((ingredient, index)=>(
        <span key={index}>{ingredient.ingredient}- {ingredient.quantity.toLowerCase()} <br/></span>
      ))}</h4>
      )}
      </div>


  

    </div>
    </main>
  );  
}

export default RecipeInfo;