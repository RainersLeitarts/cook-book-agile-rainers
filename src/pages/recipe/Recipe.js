import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './Recipe.css'

const Recipe = () => {
  let { id } = useParams();

  const { data, loading, error } = useFetch(id)
  

  const recipeCard = ()=> {
    return <div className='single-recipe-card'>
      <h1 className='recipe-title'>{data[0].title}</h1>
      <h3 className='ingredients'>{data[0].ingredients}</h3>
      <h3 className='cooking-time'>{`${data[0].cookingTime} to make.`}</h3>
      <p className='cooking-method'>{data[0].method}</p>
    </div>
  }

    return <div className='wrapper'>
      {loading && <h1 className='loading'>Loading...</h1>}
      {error && <h1 className='error'>error</h1>}
      {data && recipeCard()}
    </div>
};

export default Recipe;
