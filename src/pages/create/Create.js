import { useReducer, useState } from 'react'
import axios from 'axios'
import './Create.css'
import { useNavigate } from 'react-router-dom'


const reducer = (state, action) =>{
  switch(action.type){
    case 'title':
      return {
        ...state, 
        title: action.e.target.value
      }
    case 'ingredient':
      return {
        ...state, 
        ingredient: action.e.target.value
      }
    case 'ingredients':
      if (state.ingredient.replace(/\s+/g, ' ').trim() === ''){
        return{
          ...state,
          ingredient: ''
        }
      }
      if (state.ingredients === '') {
        return{
          ...state, 
          ingredients: state.ingredients + state.ingredient,
          ingredient: ''
        }
      }else{
        return {
          ...state, 
          ingredients: state.ingredients + ', ' + state.ingredient,
          ingredient: ''
        }
      }
    case 'method':
      return {
        ...state, 
        method: action.e.target.value
      }
    case 'time':
      return {
        ...state, 
        time: action.e.target.value
      }
  }
}

const Create = () => {
  const [state, dispatch] = useReducer(reducer, { title: '', ingredients: '', ingredient: '', method: '', time: '' })

  const navigate = useNavigate()

  console.log(state);
  
  const handleSubmit = (e) =>{
    e.preventDefault()

    axios.post('http://localhost:3003/recipes', {
      id: Math.floor(Math.random() * 10000).toString(),
      title: state.title,
      ingredients: state.ingredients,
      method: state.method,
      cookingTime: state.time + ' minutes'
    }).finally(()=>{
      navigate('/')
    })
  }

  const addIngredientHandler = (e) =>{
    e.preventDefault()
    dispatch({type: 'ingredients'})
  }



  return <div className='create'>
    <h2>Add a new recipe</h2>
    <form className='input-form' onSubmit={handleSubmit}>
      <label>Recipe title:</label>
      <input className='title-input' type='text' onChange={(e) => {dispatch({type: 'title', e: e})}}></input>
      <label>Recipe ingredients:</label>
      <div className='ingredients-wrapper'>
        <input className='ingredients-input' type='text' value={state.ingredient} onChange={(e) => {dispatch({type: 'ingredient', e: e})}}></input>
        <button onClick={addIngredientHandler} className='add-btn'>add</button>
      </div>
      <p>Current ingredients: {state.ingredients}</p>
      <label>Recipe method:</label>
      <textarea className='method-input' type='text' onChange={(e) => {dispatch({type: 'method', e: e})}}></textarea>
      <label>Cooking time (in minutes):</label>
      <input className='time-input' type='text' onChange={(e) => {dispatch({type: 'time', e: e})}}></input>
      <button type='submit' className='submit-btn'>submit</button>
    </form>
  </div>;
}

export default Create