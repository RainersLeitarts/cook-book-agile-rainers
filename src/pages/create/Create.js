import { useReducer } from 'react'
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
    case 'ingredients':
      return {
        ...state, 
        ingredients: action.e.target.value
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
  const [state, dispatch] = useReducer(reducer, { title: '', ingredients: [], method: '', time: '' })
  const navigate = useNavigate()

  console.log(state.title);
  console.log(state.ingredients);
  console.log(state.method);
  console.log(state.time);

  const handleSubmit = (e) =>{
    e.preventDefault()

    axios.post('http://localhost:3003/recipes', {
      id: Math.floor(Math.random() * 10000).toString(),
      title: state.title,
      ingredients: [state.ingredients],
      method: state.method,
      cookingTime: state.time + ' minutes'
    }).finally(()=>{
      navigate('/')
    })
  }

  return <div className='create'>
    <h2>Add a new recipe</h2>
    <form className='input-form' onSubmit={handleSubmit}>
      <label>Recipe title:</label>
      <input className='title-input' type='text' onChange={(e) => {dispatch({type: 'title', e: e})}}></input>
      <label>Recipe ingredients:</label>
      <input className='ingredients-input' type='text' onChange={(e) => {dispatch({type: 'ingredients', e: e})}}></input>
      <label>Recipe method:</label>
      <input className='method-input' type='text' onChange={(e) => {dispatch({type: 'method', e: e})}}></input>
      <label>Cooking time (in minutes):</label>
      <input className='time-input' type='text' onChange={(e) => {dispatch({type: 'time', e: e})}}></input>
      <button type='submit'>submit</button>
    </form>
  </div>;
}

export default Create