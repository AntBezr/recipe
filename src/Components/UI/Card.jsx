import React from 'react';

function Card({name,country,image}) {
  return (
    <div className='Card'>
      <div className='country'>{country}</div>
      <div className='image'><img src={image} alt={name} /></div>
        <h3>{name}</h3>  
        <button>See more...</button>
    </div>
  );
}

export default Card;