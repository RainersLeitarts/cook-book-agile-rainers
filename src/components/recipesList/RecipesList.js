import { useNavigate } from 'react-router-dom';
import './RecipesList.css'

const RecipesList = ({ data, search }) => {
  const navigator = useNavigate()

  console.log(search);


  if (search) {
    return <div className='page-wrapper'>
      {data?.map(recipe => {
        return <div key={/[^/]*$/.exec(recipe.document.name)[0]} className='recipe-card'>
          <h1 className='recipe-title'>{recipe.document.fields.title.stringValue}</h1>
          <h3 className='cooking-time'>{`${recipe.document.fields.cookingTime.stringValue} to make.`}</h3>
          <p className='cooking-method'>{recipe.document.fields.method.stringValue}</p>
          <button className='view-btn' onClick={() => { navigator(`/recipe/${/[^/]*$/.exec(recipe.document.name)[0]}`) }}>Cook This</button>
        </div>
      })}
    </div>;
  }

  return <div className='page-wrapper'>
    {data.documents?.map(recipe => {
      return <div key={/[^/]*$/.exec(recipe.name)[0]} className='recipe-card'>
        <h1 className='recipe-title'>{recipe.fields.title.stringValue}</h1>
        <h3 className='cooking-time'>{`${recipe.fields.cookingTime.stringValue} to make.`}</h3>
        <p className='cooking-method'>{recipe.fields.method.stringValue}</p>
        <button className='view-btn' onClick={() => { navigator(`/recipe/${/[^/]*$/.exec(recipe.name)[0]}`) }}>Cook This</button>
      </div>
    })}
  </div>;
};

export default RecipesList;
