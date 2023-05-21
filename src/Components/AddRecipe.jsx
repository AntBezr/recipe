import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./UI/Loader";
import "./Style/AddRecipe.css";

function AddRecipe() {
  const [countryList, setCountryList] = useState([]);
  const [recipeName, setRecipeName] = useState("");
  const [recipeAuthor, setAuthor] = useState("");
  const [recipeCountry, setCountry] = useState("");
  const [recipeDescription, setDescription] = useState("");
  const [recipeInstruction, setInstruction] = useState("");
  const [recipeImage, setImage] = useState("");
  const [ingredientsList, setIngredientsList] = useState([
    { id: 1, ingredient: "", quantity: "" },
  ]);
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);

    axios.get("https://restcountries.com/v2/all?fields=name").then((res) => {
      setCountryList(
        res.data.map((country) => {
          return country.name;
        })
      );
    });
    /*    axios.get('https://countriesnow.space/api/v0.1/countries')
      .then(res=>{setCountryList(res.data.data.map((country) => {return(country.country)}))
      }); */

    setIsLoding(false);
  }, []);

  const addIngredientHandler = (e) => {
    e.preventDefault();
    setIngredientsList([
      ...ingredientsList,
      { id: ingredientsList.length + 1, ingredient: "", quantity: "" },
    ]);
  };

  const deleteHandler = (i) => {
    const deleteValue = ingredientsList.filter((it, index) => index !== i);
    setIngredientsList(deleteValue);
  };

  const changeHandler = (e, i) => {
    const { name, value } = e.target;
    let changeValue = [...ingredientsList];
    switch (name) {
      case "ingredient":
        changeValue = [...ingredientsList];
        changeValue[i][name] = value;
        setIngredientsList(changeValue);
        break;
      case "quantity":
        changeValue = [...ingredientsList];
        changeValue[i][name] = value;
        setIngredientsList(changeValue);
        break;
      case "name":
        setRecipeName(value);
        break;
      case "author":
        setAuthor(value);
        break;
      case "country":
        setCountry(value);
        break;
      case "description":
        setDescription(value);
        break;
      case "instruction":
        setInstruction(value);
        break;
      case "image":
        setImage(value);
        break;
      default:
        break;
    }
  };
  const sendHendler = () => {
    axios
      .post("http://localhost:4001/recipes", {
        country: recipeCountry,
        name: recipeName,
        image: recipeImage,
        author: recipeAuthor,
        description: recipeDescription,
        ingredients: ingredientsList,
        instructions: recipeInstruction,
      })
      .catch(function (error) {
        alert(error);
      });
    alert("New recipe has been added ! ");
  };
  if (isLoding) {
    return <Loader />;
  }

  return (
    <div className="mainAdd">
      <div className="addNew">
        <h1>Add new recipe</h1>

        <form onSubmit={sendHendler}>
          <div className="inputBox">
            <label htmlFor="name">Recipe name</label>
            <input
              type="text"
              required
              name="name"
              id="name"
              onChange={(e) => {
                changeHandler(e);
              }}
            />
          </div>

          <div className="inputBox">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              required
              name="author"
              id="author"
              onChange={(e) => {
                changeHandler(e);
              }}
            />
          </div>

          <div className="inputBox">
            <label htmlFor="countryList">Country of origin</label>
            <input
              required
              id="countryList"
              list="country"
              name="country"
              onChange={(e) => {
                changeHandler(e);
              }}
            />
            <datalist id="country">
              {countryList.map((country) => (
                <option key={country} value={country}></option>
              ))}
            </datalist>
          </div>

          <div className="inputBox">
            <label htmlFor="description">Description</label>
            <textarea
              name="description"
              required
              id="description"
              onChange={(e) => {
                changeHandler(e);
              }}
            />
          </div>

          <div className="inputBox">
            <label htmlFor="instruction">Instruction</label>
            <textarea
              name="instruction"
              required
              id="instruction"
              onChange={(e) => {
                changeHandler(e);
              }}
            />
          </div>

          <div className="inputBox">
            <label htmlFor="image">Image url</label>
            <input
              type="text"
              name="image"
              id="image"
              onChange={(e) => {
                changeHandler(e);
              }}
            />
          </div>

          <div className="ingredients">
            {ingredientsList.map((val, i) => (
              <div className="ingredientBox" key={i}>
                <div className="inputBox">
                  <label htmlFor="ingredient">Ingredient</label>
                  <input
                    required
                    type="text"
                    name="ingredient"
                    id="ingredient"
                    value={val.ingredient}
                    onChange={(e) => {
                      changeHandler(e, i);
                    }}
                  />
                </div>
                <div className="inputBox">
                  <label htmlFor="quantity">Quantity</label>
                  <input
                    required
                    type="text"
                    name="quantity"
                    id="quantity"
                    value={val.quantity}
                    onChange={(e) => {
                      changeHandler(e, i);
                    }}
                  />
                </div>
                <button
                  className="delete"
                  type="button"
                  onClick={() => deleteHandler(i)}
                >
                  x
                </button>
              </div>
            ))}
          </div>
          <button onClick={addIngredientHandler}>Add new ingredient</button>

          <button className="addRecipe" type="submit">
            Add recipe
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;
