import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './RecipesList.css'
import { ThemeContext } from '../../theme-context';

const RecipesList = ({data}) => {
  const [{theme}] = useContext(ThemeContext)
  const navigator = useNavigate()
  console.log('Theme: ' + theme.color)

  return <div className='page-wrapper'>
  {data?.map(recipe=>{
    return <div key={recipe.id} style={{backgroundColor: theme.backgroundColorCard}} className='recipe-card'>
        <h1 className='recipe-title' style={{color: theme.cardTitleTextColor}}>{recipe.title}</h1>
        <h3 className='cooking-time' style={{color: theme.cardTimeTextColor}}>{`${recipe.cookingTime} to make.`}</h3>
        <p className='cooking-method' style={{color: theme.cardMethodTextColor}}>{recipe.method}</p>
        <button className='view-btn' style={{color: theme.cardButtonTextColor, backgroundColor: theme.cardButtonColor}} onClick={()=>{navigator(`/recipe/${recipe.id}`)}}>Cook This</button>
      </div>
  })}
</div>;
};

export default RecipesList;
