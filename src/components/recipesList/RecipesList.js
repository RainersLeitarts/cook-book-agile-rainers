import { useNavigate } from 'react-router-dom';
import './RecipesList.css'

const RecipesList = ({ data, search }) => {
  const navigator = useNavigate()

  const RecipeCard = ({ name, title, cookingTime, method }) => {
    return <div className='recipe-card'>
      <h1 className='recipe-title'>{title}</h1>
      <h3 className='cooking-time'>{`${cookingTime} to make.`}</h3>
      <p className='cooking-method'>{method}</p>
      <button className='view-btn' onClick={() => { navigator(`/recipe/${/[^/]*$/.exec(name)[0]}`) }}>Cook This</button>
    </div>
  }

  if (search) {
    return <div className='page-wrapper'>
      {data?.map(recipe => {
        return <RecipeCard key={/[^/]*$/.exec(recipe.document.name)[0]}
          name={recipe.document.name}
          title={recipe.document.fields.title.stringValue}
          cookingTime={recipe.document.fields.cookingTime.stringValue}
          method={recipe.document.fields.method.stringValue} />
      })}
    </div>;
  }

  return <div className='page-wrapper'>
    {data.documents?.map(recipe => {
      return <RecipeCard key={/[^/]*$/.exec(recipe.name)[0]}
        name={recipe.name}
        title={recipe.fields.title.stringValue}
        cookingTime={recipe.fields.cookingTime.stringValue}
        method={recipe.fields.method.stringValue} />
    })}
  </div>;
};

export default RecipesList;
