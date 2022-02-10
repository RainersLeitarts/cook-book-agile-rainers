import { useReducer, useContext } from 'react'
import axios from 'axios'
import './Create.css'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../theme-context'


const reducer = (state, action) => {
  switch (action.type) {
    case 'title':
      let title = action.e.target.value;
      title = title.replace(/ +(?= )/g, '');

      if (state.title === '' && action.e.target.value === ' ') {
        return {
          ...state,
          title: ''
        }
      }

      return {
        ...state,
        title: title
      }
    case 'ingredient':
      let ingredient = action.e.target.value;
      ingredient = ingredient.replace(/ +(?= )/g, '');

      if (state.ingredient === '' && action.e.target.value === ' ') {
        return {
          ...state,
          ingredient: ''
        }
      }

      return {
        ...state,
        ingredient: ingredient
      }
    case 'ingredients':
      if (state.ingredient.replace(/\s+/g, ' ').trim() === '') {
        return {
          ...state,
          ingredient: ''
        }
      }
      if (state.ingredients === '') {
        return {
          ...state,
          ingredients: state.ingredients + state.ingredient.trim(),
          ingredient: ''
        }
      } else {
        return {
          ...state,
          ingredients: state.ingredients + ', ' + state.ingredient.trim(),
          ingredient: ''
        }
      }
    case 'method':
      let method = action.e.target.value;
      console.log('method: ' + method);
      method = method.replace(/ +(?= )/g, '');
      console.log(method);

      if (state.method === '' && action.e.target.value === ' ') {
        return {
          ...state,
          method: ''
        }
      }

      return {
        ...state,
        method: method
      }
    case 'time':
      let time = action.e.target.value
      time = time.replace(/ +(?= )/g, '');
      time = time.replace(/\D/g, '');

      if (state.time === '' && action.e.target.value === ' ') {
        return {
          ...state,
          time: ''
        }
      }

      return {
        ...state,
        time: time
      }
  }
}

const Create = () => {
  const [state, dispatch] = useReducer(reducer, { title: '', ingredients: '', ingredient: '', method: '', time: '' })
  const [{theme}] = useContext(ThemeContext)

  const navigate = useNavigate()

  console.log(state);

  const handleSubmit = (e) => {
    e.preventDefault()

    axios.post('http://localhost:3003/recipes', {
      id: Math.floor(Math.random() * 10000).toString(),
      title: state.title.trim(),
      ingredients: state.ingredients,
      method: state.method.trim(),
      cookingTime: state.time + ' minutes'
    }).finally(() => {
      navigate('/')
    })
  }

  const addIngredientHandler = (e) => {
    e.preventDefault()
    dispatch({ type: 'ingredients' })
  }



  return <div className='create'>
    <h2 style={{color: theme.createTitleTextColor, transition: 'all 0.1s ease-out'}}>Add a new recipe</h2>
    <form className='input-form' onSubmit={handleSubmit}>
      <label style={{color: theme.createLabelTextColor}}>Recipe title:
      <input className='title-input' type='text' style={{backgroundColor: theme.createInputBackgroundColor}} value={state.title} onChange={(e) => { dispatch({ type: 'title', e: e }) }}></input>
      </label>
      <label style={{color: theme.createLabelTextColor}}>Recipe ingredients:
      <div className='ingredients-wrapper'>
        <input className='ingredients-input' type='text' style={{backgroundColor: theme.createInputBackgroundColor}} value={state.ingredient} onChange={(e) => { dispatch({ type: 'ingredient', e: e }) }}></input>
        <button onClick={addIngredientHandler} className='add-btn'>add</button>
      </div>
      </label>
      <p style={{color: theme.createCurrentIngredientsTextColor}}>Current ingredients: {state.ingredients}</p>
      <label style={{color: theme.createLabelTextColor}}>Recipe method:
        <textarea className='method-input' type='text' style={{backgroundColor: theme.createInputBackgroundColor}} value={state.method} onChange={(e) => { dispatch({ type: 'method', e: e }) }}></textarea>
      </label>
      <label style={{color: theme.createLabelTextColor}}>Cooking time (in minutes):
        <input className='time-input' type='numbers' style={{backgroundColor: theme.createInputBackgroundColor}} value={state.time} onChange={(e) => { dispatch({ type: 'time', e: e }) }}></input>
      </label>
      <button type='submit' className='submit-btn'>submit</button>
    </form>
  </div>;
}

export default Create