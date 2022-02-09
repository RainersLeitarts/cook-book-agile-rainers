import { useReducer, useState } from 'react'
import axios from 'axios'
import './Create.css'
import { useNavigate } from 'react-router-dom'


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

  const navigate = useNavigate()

  console.log(state);

  const handleSubmit = (e) => {
    e.preventDefault()
    if(state.title.trim() === '' || state.ingredients === '' || state.method.trim() === '' || state.time === '') return

    let search = []
    state.title.trim().split(' ').map(element=>{
      search.push({stringValue: element.toLowerCase()})
    })

    state.method.trim().split(' ').map(element=>{
      search.push({stringValue: element.toLowerCase()})
    })

    axios.post('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes', {
      fields: {
        title: {stringValue: state.title.trim()},
        ingredients: {stringValue: state.ingredients},
        method: {stringValue: state.method.trim()},
        cookingTime: {stringValue: state.time + ' minutes'},
        search: {arrayValue: {values:[search]}}
      }
    }).finally(() => {
      navigate('/')
    })
  }

  const addIngredientHandler = (e) => {
    e.preventDefault()
    dispatch({ type: 'ingredients' })
  }



  return <div className='create'>
    <h2>Add a new recipe</h2>
    <form className='input-form' onSubmit={handleSubmit}>
      <label>Recipe title:</label>
      <input className='title-input' type='text' value={state.title} onChange={(e) => { dispatch({ type: 'title', e: e }) }}></input>
      <label>Recipe ingredients:</label>
      <div className='ingredients-wrapper'>
        <input className='ingredients-input' type='text' value={state.ingredient} onChange={(e) => { dispatch({ type: 'ingredient', e: e }) }}></input>
        <button onClick={addIngredientHandler} className='add-btn'>add</button>
      </div>
      <p>Current ingredients: {state.ingredients}</p>
      <label>Recipe method:</label>
      <textarea className='method-input' type='text' value={state.method} onChange={(e) => { dispatch({ type: 'method', e: e }) }}></textarea>
      <label>Cooking time (in minutes):</label>
      <input className='time-input'  value={state.time} onChange={(e) => { dispatch({ type: 'time', e: e }) }}></input>
      <button type='submit' className='submit-btn'>submit</button>
    </form>
  </div>;
}

export default Create