import { useParams } from 'react-router-dom';
import { useContext } from 'react'
import useFetch from '../../hooks/useFetch';
import { ThemeContext } from '../../theme-context';
import './Recipe.css'

const Recipe = () => {
  let { id } = useParams();
  const [{theme}] = useContext(ThemeContext)

  const { data, loading, error } = useFetch(`http://localhost:3003/recipes/${id}`)

  const recipeCard = ()=> {
    return <div style={{backgroundColor: theme.recipeBackgroundColorCard}} className='single-recipe-card'>
      <h1 style={{color: theme.recipeCardTitleTextColor}} className='recipe-title'>{data.title}</h1>
      <h3 style={{color: theme.recipeCardIngredientsTextColor}} className='ingredients'>{data.ingredients}</h3>
      <h3 style={{color: theme.recipeCardTimeTextColor}} className='cooking-time'>{`${data.cookingTime} to make.`}</h3>
      <p style={{color: theme.recipeCardMethodTextColor}} className='cooking-method'>{data.method}</p>
    </div>
  }

    return <div className='wrapper'>
      {loading && <h1 className='loading'>Loading...</h1>}
      {error && <h1 className='error'>error</h1>}
      {data && recipeCard()}
    </div>
};

export default Recipe;
