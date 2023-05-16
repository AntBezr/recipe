import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Card.css'
import Loader from './Loader';

function Card({id,name,country,image}) {
  const [flag, setFlag] = useState('');
  const [isLoding, setIsLoding] = useState(false);

  useEffect( ()=>{ 
    setIsLoding(true)
      axios.get(`https://restcountries.com/v3.1/name/${country}`).then(res=>setFlag(res.data[0].flags.svg
))
setIsLoding(false)
  },[]
  )

  if (isLoding){
    return( 
      <Loader/>
  )}
  return (
    <div className='Card'>
      <div className='country'><img src={flag} alt={country} /></div>
      <div className='image'><img src={image} alt={name} /></div>
        <h3>{name}</h3>  
        <Link to={id.toString()}><button >See more...</button></Link>
    </div>
  );
}

export default Card;