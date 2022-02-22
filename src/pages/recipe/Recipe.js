import { useParams } from 'react-router-dom';
import { useContext } from 'react';
import useFetch from '../../hooks/useFetch';
import { ThemeContext } from '../../hooks/useTheme';
import './Recipe.css'

const Recipe = () => {
  let { id } = useParams();
  const [{theme}] = useContext(ThemeContext)
  

  const { data, loading, error } = useFetch(`https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes/${id}`)

  const recipeCard = ()=> { 
    console.log(data.fields.cookingTime.stringValue);
    return <div className='single-recipe-card' style={{backgroundColor: theme.recipeBackgroundColorCard}}>
      <h1 className='recipe-title' style={{color: theme.recipeCardTitleTextColor}}>{data.fields.title.stringValue}</h1>
      <h3 className='ingredients' style={{color: theme.recipeCardIngredientsTextColor}}>{data.fields.ingredients.stringValue}</h3>
      <h3 className='cooking-time' style={{color: theme.recipeCardTimeTextColor}}>{`${data.fields.cookingTime.stringValue} to make.`}</h3>
      <p className='single-cooking-method' style={{color: theme.recipeCardMethodTextColor}}>{data.fields.method.stringValue}</p>
    </div>
  }

    return <div className='wrapper'>
      {loading && <h1 className='loading'>Loading...</h1>}
      {error && <h1 className='error'>error</h1>}
      {data && recipeCard()}
    </div>
};

export default Recipe;
