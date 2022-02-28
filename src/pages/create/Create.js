import { useContext, useState } from 'react'
import axios from 'axios'
import './Create.css'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../hooks/useTheme'

const Create = ({loginData}) => {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [method, setMethod] = useState('')
  const [time, setTime] = useState('')

  const [{theme}] = useContext(ThemeContext)

  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    if(title.trim() === '' || ingredients === '' || method.trim() === '' || time === '') return

    let search = title.trim() + ' ' + method.trim()


    axios.post('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes', {
      fields: {
        title: {stringValue: title.trim()},
        ingredients: {stringValue: ingredients},
        method: {stringValue: method.trim()},
        cookingTime: {stringValue: time + ' minutes'},
        search: {stringValue: search.trim().toLowerCase()},
        author: {stringValue: loginData.name},
      }
    }).finally(() => {
      navigate('/')
    })
  }

  const addIngredientHandler = (e) => {
    e.preventDefault()

    if(ingredient === '') return
    
    setIngredients((prevIngredients)=>{
      if(ingredients != ''){
        setIngredients(prevIngredients + ', ' + ingredient.trim())
      }else{
        setIngredients(prevIngredients + ingredient.trim())
      }

      setIngredient('')
      
    })
  }


  const inputHandler = (e, type) => {
    let input = e.target.value.replace(/ +(?= )/g, '');

    if(input === ' ') input = ''

    switch(type){
      case 'title':
        setTitle(input)
        break;
      case 'ingredient':
        setIngredient(input)
        break;
      case 'method':
        setMethod(input)
        break;
      case 'time':
        setTime(input.replace(/\D/g,''))
        break;
    }
  }



  return <div className='create'>
    <h2 style={{color: theme.createTitleTextColor}}>Add a new recipe</h2>
    <form className='input-form' onSubmit={handleSubmit}>
      <label style={{color: theme.createLabelTextColor}}>Recipe title:
      <input className='title-input' style={{backgroundColor: theme.createInputBackgroundColor}} type='text' value={title} onChange={(e) => { inputHandler(e, 'title') }}></input>
      </label>
      <label style={{color: theme.createLabelTextColor}}>Recipe ingredients:
      <div className='ingredients-wrapper'>
        <input className='ingredients-input' style={{backgroundColor: theme.createInputBackgroundColor}} type='text' value={ingredient} onChange={(e) => { inputHandler(e, 'ingredient') }}></input>
        <button onClick={addIngredientHandler} className='add-btn'>add</button>
      </div>
      </label>
      <p style={{color: theme.createCurrentIngredientsTextColor}}>Current ingredients: {ingredients}</p>
      <label style={{color: theme.createLabelTextColor}}>Recipe method:
      <textarea className='method-input' style={{backgroundColor: theme.createInputBackgroundColor}} type='text' value={method} onChange={(e) => { inputHandler(e, 'method') }}></textarea>
      </label>
      <label style={{color: theme.createLabelTextColor}}>Cooking time (in minutes):
      <input className='time-input' style={{backgroundColor: theme.createInputBackgroundColor}} type='text' value={time} onChange={(e) => { inputHandler(e, 'time') }}></input>
      </label>
      <button type='submit' className='submit-btn'>submit</button>
    </form>
  </div>;
}

export default Create