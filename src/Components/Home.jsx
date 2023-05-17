import React from 'react';
import { Link } from 'react-router-dom';
import './Style/Home.css'

function Home(props) {
  return (
    <div className='homeMain'>
      <div className='hero'> 
   
    </div>
    <div className='cardsBox'>
     
        <div className='linkBox'>
          <h3>Browse Recipes</h3>
          <p>Find your Favorites in this unic collection. You can search reacipes based on name.</p>
          <Link to={"/recipes"} className="hover-underline-animation"> All recipes </Link>
        </div>
    
     
        <div className='linkBox'>
          <h3>Add recipes</h3>
          <p>Do you whant to share your own recipe or ypur national recipe ? Add it now !</p>
          <Link to={"/addRecipe"} className="hover-underline-animation"> Add recipe </Link>
        </div>
    
    
        <div className='linkBox'>
          <h3>Whant to know more about our projects?</h3>
          <p>Visit our programme homepage</p>
            <Link to={"https://en.bc.fi/qualifications/full-stack-web-developer-program/"} className="hover-underline-animation" target="_blank">Business College Helsinki homepage</Link>
        </div>

    </div>
    </div>
    
  );
}

export default Home;