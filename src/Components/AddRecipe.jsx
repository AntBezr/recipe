import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './UI/Loader';

function AddRecipe() {
  const [countryList, setCountryList]= useState([])
  const [ingredientsList, setIngredientsList]= useState([{id:1, ingredient:"", quantity:""}])
  const [isLoding, setIsLoding] = useState(false);
  useEffect(()=>{
    setIsLoding(true)
  
    axios.get('https://restcountries.com/v3.1/all?fields=name')
      .then(res=>{setCountryList(res.data.map((country) => {return(country.name.common)}))
      });
    setIsLoding(false)
  },[])

  const addIngredientHandler=(e)=>{
    e.preventDefault();
    setIngredientsList([...ingredientsList,{id:ingredientsList.length+1, ingredient:"", quantity:""}])
  }

  const deleteHandler=(i)=>{
    const deleteValue = [...ingredientsList]
    deleteValue.splice(i,1)
    setIngredientsList(deleteValue)

  }

  const changeHandler=()=>{
  
  }

  if (isLoding){
    return( 
      <Loader/>
  )}
  
  return (
    <div className='page'>
      <h1>Add new recipe</h1>

      <form action="">
        <div className='inputBox'>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' id='name'/>
        </div>
        <div className='inputBox'>
        <label htmlFor="author" >Aithor</label>
        <input type="text" name='author' id='author'/>
        </div>
        <div className='inputBox'>
      <select name="country" id="country">       
      {  countryList.map(country=>{ return(<option key ={country} value={country}>{country}</option>)})} 
      </select>
        </div>
        <div className='inputBox'>
        <label htmlFor="description">Description</label>
        <textarea  name='description' id='description'/>
        </div>
        <div className='inputBox'>
        <label htmlFor="image">Image</label>
        <input type="text" name='image' id='image'/>
        </div>
        <div className='ingredients'>
          <div className='ingredientBox'>
            <label htmlFor="">Ingredient</label>
          <label htmlFor="">Quantity</label>

        </div>
        <div>
          <button onClick={addIngredientHandler} >Add</button>
            {
              ingredientsList.map((val, i)=>( <div className='ingredientBox' key={i}>
              <input type="text" name='ingredient' value={val.ingredient} onChange={(e)=>{changeHandler(e,i)}}/>
              <input type="text" name='quantity' value={val.quantity} onChange={(e)=>{changeHandler(e,i)}}/>
              <button onClick={()=>deleteHandler(i)}>x</button>
              </div>)
                )
             
              
            }
          </div>
        
   
        </div>
  
      </form>

    </div>
  );
}

export default AddRecipe;