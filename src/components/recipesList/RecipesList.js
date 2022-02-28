import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import './RecipesList.css'
import { ThemeContext } from '../../hooks/useTheme';

const RecipesList = ({ data }) => {
  const navigator = useNavigate()
  const [{ theme }] = useContext(ThemeContext)
  console.log('Theme: ' + theme.color)


  return <div className='page-wrapper'>
    {data.documents?.map(recipe => {
      return <div key={/[^/]*$/.exec(recipe.name)[0]} className='recipe-card' style={{ backgroundColor: theme.backgroundColorCard }}>
        <h1 className='recipe-title' style={{ color: theme.cardTitleTextColor }}>{recipe.fields.title.stringValue}</h1>
        <h3 className='cooking-time' style={{ color: theme.cardTimeTextColor }}>{`${recipe.fields.cookingTime.stringValue} to make.`}</h3>
        <p className='cooking-method' style={{ color: theme.cardMethodTextColor }}>{recipe.fields.method.stringValue}</p>
        <button className='view-btn' style={{ color: theme.cardButtonTextColor, backgroundColor: theme.cardButtonColor }} onClick={() => { navigator(`/recipe/${/[^/]*$/.exec(recipe.name)[0]}`) }}>Cook This</button>
        {recipe.fields.missing && <p style={{padding: 0, margin: 0, color: theme.cardMissingColor}}>Missing: {recipe.fields.missing.join(", ")}</p>}
        {recipe.fields.author && <p style={{padding: 0, marginTop: '1rem', color: theme.cardMissingColor}}>Author: {recipe.fields.author.stringValue}</p>}
      </div>
    })}
  </div>;
};

export default RecipesList;
