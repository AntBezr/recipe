import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loader from './UI/Loader';

function AddRecipe() {
  const [countryList, setCountryList]= useState([])
  const [recipeName, setRecipeName]= useState('')
  const [recipeAuthor, setAuthor]= useState('')
  const [recipeCountry, setCountry]= useState('')
  const [recipeDescription, setDescription]= useState('')
  const [recipeInstruction, setInstruction]= useState('')
  const [recipeImage, setImage]= useState('')
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

  const changeHandler=(e,i)=>{
    const {name,value} = e.target
    let changeValue=[...ingredientsList]
    switch (name) {
      case "ingredient":
        changeValue=[...ingredientsList]
        changeValue[i][name]=value
        setIngredientsList(changeValue)
        break;
      case "quantity":
        changeValue=[...ingredientsList]
        changeValue[i][name]=value
        setIngredientsList(changeValue) 
        break;
      case "name":
        console.log(value);
        setRecipeName(value)
        break;
      case "author":
        setAuthor(value)
        break;
      case "country":
        setCountry(value)
        break;
      case "description":
        setDescription(value)
        break;
      case "instruction":
        setInstruction(value)
        break;
      case "image":
        setImage(value)
        break;
        default:
          break
    }
  };
const sendHendler=()=>{
  axios.post("http://localhost:4001/recipes",{
    "country": recipeCountry,
    "name": recipeName,
    "image": recipeImage,
    "author": recipeAuthor,
    "description": recipeDescription,
    "ingredients": ingredientsList,
    "instructions": recipeInstruction,
  })  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}
  if (isLoding){
    return( 
      <Loader/>
  )}
  
  return (
    <div className='page'>
      <h1>Add new recipe</h1>

      <form onSubmit={sendHendler}>
        <div className='inputBox'>
        <label htmlFor="name">Name</label>
        <input type="text" name='name' id='name' onChange={(e)=>{changeHandler(e)}}/>
        </div>
        <div className='inputBox'>
        <label htmlFor="author" >Aithor</label>
        <input type="text" name='author' id='author' onChange={(e)=>{changeHandler(e)}}/>
        </div>
        <div className='inputBox'>
      <select name="country" id="country" onChange={(e)=>{changeHandler(e)}}>       
      {  countryList.map(country=>{ return(<option key ={country} value={country}>{country}</option>)})} 
      </select>
        </div>
        <div className='inputBox'>
        <label htmlFor="description">Description</label>
        <textarea  name='description' id='description' onChange={(e)=>{changeHandler(e)}}/>
        </div>
        <div className='inputBox'>
        <label htmlFor="instruction">Instruction</label>
        <textarea  name='instruction' id='instruction' onChange={(e)=>{changeHandler(e)}}/>
        </div>
        <div className='inputBox'>
        <label htmlFor="image">Image</label>
        <input type="text" name='image' id='image' onChange={(e)=>{changeHandler(e)}}/>
        </div>
        <div className='ingredients'>
          <div className='ingredientBox'>
            <label htmlFor="">Ingredient</label>
          <label htmlFor="">Quantity</label>

        </div>
        <div>
            {
              ingredientsList.map((val, i)=>( <div className='ingredientBox' key={i}>
              <input type="text" name='ingredient' value={val.ingredient} onChange={(e)=>{changeHandler(e,i)}}/>
              <input type="text" name='quantity' value={val.quantity} onChange={(e)=>{changeHandler(e,i)}}/>
              <button onClick={()=>deleteHandler(i)}>x</button>
              </div>)
                ) 
            }
            <button onClick={addIngredientHandler} >Add new ingredient</button>
          </div>
        
   
        </div>
  <button type="submit">Add recipe</button>
      </form>

    </div>
  );
}

export default AddRecipe;