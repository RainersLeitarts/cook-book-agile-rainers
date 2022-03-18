import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipesList from '../../components/recipesList/RecipesList';
import useFetch from '../../hooks/useFetch';
import './Search.css'

const Search = () => {
  const [search] = useSearchParams()
  const [recipes, setRecipes] = useState()

  //search params are used
  const searchTerms = search.get('q').toLowerCase().trim().split(' ')
  
  const {loading, error, sendRequest: fetchRecipes} = useFetch()


  useEffect(()=>{
    //updates state with data fetched
    const getRecipes = (recipeData) => {
      setRecipes(recipeData)
    }

    //useFetch to fetch recipes
    fetchRecipes({url: 'https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes'}, getRecipes)
  }, [search])

  //ranks search results
  if (recipes != null) {
    recipes.documents = recipes.documents.filter(item => {
      let score = 0
      let missing = []

      searchTerms.map(term => {
        if (item.fields.search.stringValue.includes(term)) {
          score++
        } else {
          missing.push(term)
        }
      })

      if (score !== 0) {
        item.fields['score'] = score
        if (missing.length !== 0) item.fields['missing'] = missing
        return item
      }
    })

    recipes.documents = recipes.documents.sort((a, b) => {
      return b.fields.score - a.fields.score
    })
  }

  return <div className='wrapper'>
    {loading && <h1 className='loading'>Loading...</h1>}
    {error && <h1 className='error'>error</h1>}
    {loading === false && recipes?.documents.length === 0 && <h1 className='noData'>No recipes found...</h1>}
    {recipes != undefined && <RecipesList data={recipes} />}
  </div>
};

export default Search;
