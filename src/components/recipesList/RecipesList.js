import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import './RecipesList.css'
import { ThemeContext } from '../../hooks/useTheme';
import axios from 'axios';

const RecipesList = ({ data, deleteFunct }) => {
  const [recipeData, setRecipeData] = useState(data)
  
  useEffect(()=>{
    setRecipeData(data)
    console.log(data)
  }, [data])

  const navigator = useNavigate()
  const [{ theme }] = useContext(ThemeContext)

  return <div className='page-wrapper'>
    {recipeData.documents?.map(recipe => {
      return <div key={/[^/]*$/.exec(recipe.name)[0]} className='recipe-card' style={{ backgroundColor: theme.backgroundColorCard }}>
        <h1 className='recipe-title' style={{ color: theme.cardTitleTextColor }}>{recipe.fields.title.stringValue}</h1>
        <h3 className='cooking-time' style={{ color: theme.cardTimeTextColor }}>{`${recipe.fields.cookingTime.stringValue} to make.`}</h3>
        <p className='cooking-method' style={{ color: theme.cardMethodTextColor }}>{recipe.fields.method.stringValue}</p>
        <button className='view-btn' style={{ color: theme.cardButtonTextColor, backgroundColor: theme.cardButtonColor }} onClick={() => { navigator(`/recipe/${/[^/]*$/.exec(recipe.name)[0]}`) }}>Cook This</button>
        {recipe.fields.missing && <p style={{ padding: 0, margin: 0, color: theme.cardMissingColor }}>Missing: {recipe.fields.missing.join(", ")}</p>}

        <div className='additionals'>
          {recipe.fields.author && <p style={{ padding: 0, marginTop: '1rem', color: theme.cardMissingColor, cursor: 'pointer' }} onClick={() => { navigator(`/user/${recipe.fields.authorid.stringValue}`) }}>Author: {recipe.fields.author.stringValue}</p>}
          {//delete user owned recipe
            deleteFunct && recipe.fields.authorid.stringValue == JSON.parse(localStorage.getItem('loginData')).id ? <p className='delete' style={{ padding: 0, color: theme.cardMissingColor, cursor: 'pointer' }} onClick={() => { deleteFunct(`/${/[^/]*$/.exec(recipe.name)[0]}`) }}>[X]</p> : ''}
          {//edit user owned recipe
            deleteFunct && recipe.fields.authorid.stringValue == JSON.parse(localStorage.getItem('loginData')).id ? <p className='edit' style={{ padding: 0, color: theme.cardMissingColor, cursor: 'pointer' }} onClick={() => { navigator(`/edit/${/[^/]*$/.exec(recipe.name)[0]}`) }}>[EDIT]</p> : ''}
        </div>
      </div>
    })}
  </div>;
};

export default RecipesList;
