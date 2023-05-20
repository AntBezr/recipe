import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Style/RecipeInfo.css";
import Loader from "./UI/Loader";
import axios from "axios";

function RecipeInfo() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [flag, setFlag] = useState("");
  const [dishImage, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(`http://localhost:4001/recipes/${params.id}`)
      .then((res) => {
        setData(res.data);

        axios
          .get(`https://restcountries.com/v3.1/name/${res.data.country}`)
          .then((res) => setFlag(res.data[0].flags.svg));
        setIsLoading(false);
      })
      .catch(function (error) {
        /*    <Error />; */
      });
  }, []);

  function checkIfImageExists(url, callback) {
    const img = new Image();
    img.src = url;

    if (img.complete) {
      callback(true);
    } else {
      img.onload = () => {
        callback(true);
      };

      img.onerror = () => {
        callback(false);
      };
    }
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mainInfo">
      <div className="recipeInfo">
        <h2>{data.name}</h2>
        <div className="imageAndDescription">
          <div className="images">
            <img
              id="dish"
              src={data.image}
              onError={(e) => {
                e.target.src = require("../images/notFound.webp");
              }}
              alt={data.name}
            />
            <img className="country" src={flag} alt={data.country} />
          </div>
          <div className="descAndIngr">
            <h3>Ingredients</h3>
            <table>
              <tbody>
                <tr>
                  <th>Ingredient</th>
                  <th>Quantity</th>
                </tr>
                {data.ingredients &&
                  data.ingredients.map((ingredient) => (
                    <tr key={ingredient.id}>
                      <td>
                        <h4 key={ingredient.id}>{ingredient.ingredient}</h4>
                      </td>
                      <td>
                        <h4>{ingredient.quantity}</h4>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="box">
              <h3>Description</h3>
              <h4>{data.description}</h4>
            </div>
            <div className="box">
              <h3>Instructions:</h3>
              <h4>{data.instructions}</h4>
            </div>
            <div className="box">
              <h3>Author:</h3>
              <h4>{data.author}</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeInfo;
