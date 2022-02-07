import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './Recipe.css'

const Recipe = () => {
  let { id } = useParams();
  

  const { data, loading, error } = useFetch(`https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes/${id}`)

  const recipeCard = ()=> { 
    console.log(data.fields.cookingTime.stringValue);
    return <div className='single-recipe-card'>
      <h1 className='recipe-title'>{data.fields.title.stringValue}</h1>
      <h3 className='ingredients'>{data.fields.ingredients.stringValue}</h3>
      <h3 className='cooking-time'>{`${data.fields.cookingTime.stringValue} to make.`}</h3>
      <p className='cooking-method'>{data.fields.method.stringValue}</p>
    </div>
  }

    return <div className='wrapper'>
      {loading && <h1 className='loading'>Loading...</h1>}
      {error && <h1 className='error'>error</h1>}
      {data && recipeCard()}
    </div>
};

export default Recipe;
