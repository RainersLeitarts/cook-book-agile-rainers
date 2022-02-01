import { Link } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './Home.css'

const Home = () => {
  const {data, loading, error} = useFetch('http://localhost:3003/recipes')

  if(loading) return <h1>Loading...</h1>

  if(error) return <h1>Error...</h1>

  
    return <div className='page-wrapper'>
      {data?.map(recipe=>{
        return <div key={recipe.id} className='recipe-card'>
            <h1 className='recipe-title'>{recipe.title}</h1>
            <h3 className='cooking-time'>{`${recipe.cookingTime} to make.`}</h3>
            <p className='cooking-method'>{recipe.method}</p>
            <Link to={`/recipe/${recipe.id}`}><button>Cook This</button></Link>
          </div>
      })}
    </div>;
}

export default Home;
