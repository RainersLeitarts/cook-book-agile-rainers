import { Link } from 'react-router-dom';
import './RecipesList.css'

const RecipesList = ({data}) => {
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
};

export default RecipesList;
