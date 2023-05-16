import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Layout from './pages/Layout';
import Home from './Components/Home'
import RecipeList from './Components/RecipeList'
import AddRecipe from './Components/AddRecipe'
import RecipeInfo from './Components/RecipeInfo';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Layout/>}>

          <Route index element={<Home/>}/>
          <Route path='recipes' element={<RecipeList/>}/>
          <Route path='addRecipe' element={<AddRecipe/>}/>
          <Route path='recipes/:id' element={<RecipeInfo/>}/>

        </Route>  
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
