import { useEffect, useState } from 'react';
import RecipesList from '../../components/recipesList/RecipesList';
import useFetch from '../../hooks/useFetch';
import './Home.css'

const Home = () => {
  const [recipes, setRecipes] = useState()
  //using useFetch hook to fetch recipes
  const {loading, error, sendRequest: fetchRecipes} = useFetch()
  
  useEffect(()=>{
    const getRecipes = (recipeData) => {
      setRecipes(recipeData)
    }

    fetchRecipes({url: 'https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes'}, getRecipes)
  }, [fetchRecipes])

    return <div className='wrapper'>
      {loading && <h1 className='loading'>Loading...</h1>}
      {error && <h1 className='error'>error</h1>}
      {recipes && <RecipesList data={recipes}/>}
    </div>
}

export default Home;
