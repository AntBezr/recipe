import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Card.css";
import Loader from "./Loader";
import PropTypes from "prop-types";

function Card({ id, name, country, image }) {
  const [flag, setFlag] = useState("");
  const [isLoding, setIsLoding] = useState(false);

  useEffect(() => {
    setIsLoding(true);
    axios
      .get(`https://restcountries.com/v3.1/name/${country}`)
      .then((res) => setFlag(res.data[0].flags.svg))
      .catch(function (error) {
        alert(error);
      });
    setIsLoding(false);
  }, [country]);

  if (isLoding) {
    return <Loader />;
  }
  return (
    <div className="Card">
      <div className="country">
        <img src={flag} alt={country} />
      </div>
      <Link to={id.toString()}>
        <div className="image">
          <img
            id="dish"
            src={image}
            onError={(e) => {
              e.target.src = require("../../images/notFound.webp");
            }}
            alt={name}
          />
        </div>
      </Link>
      <h3>{name}</h3>
      <Link to={id.toString()}>
        <button>See more...</button>
      </Link>
    </div>
  );
}

Card.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  country: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Card;
