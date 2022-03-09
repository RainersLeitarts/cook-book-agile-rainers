import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './Create.css'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../hooks/useTheme'

const Create = ({ loginData, edit, editData }) => {
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [ingredient, setIngredient] = useState('')
  const [method, setMethod] = useState('')
  const [time, setTime] = useState('')

  const [{ theme }] = useContext(ThemeContext)


  useEffect(() => {
    if (edit) {
      console.log(editData)
      setTitle(editData.fields.title.stringValue)
      setIngredients(editData.fields.ingredients.stringValue)
      setMethod(editData.fields.method.stringValue)
      setTime(editData.fields.cookingTime.stringValue.replaceAll(' minutes', ''))
    }

  }, [])


  const navigate = useNavigate()


  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() === '' || ingredients === '' || method.trim() === '' || time === '') return

    let search = title.trim() + ' ' + method.trim()


    //   /[^/]*$/.exec(editData.name)
    if (edit) {
      axios.patch('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes/' + editData.name.split('/').pop() + '?updateMask.fieldPaths=title&updateMask.fieldPaths=ingredients&updateMask.fieldPaths=method&updateMask.fieldPaths=cookingTime&updateMask.fieldPaths=search', {
        fields: {
          title: { stringValue: title.trim() },
          ingredients: { stringValue: ingredients },
          method: { stringValue: method.trim() },
          cookingTime: { stringValue: time + ' minutes' },
          search: { stringValue: search.trim().toLowerCase() },
        }
      }, {
        headers: {
          //insert idToken
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('loginData')).idToken
        }
      }).then((res)=>{
        console.log(res.data)
      }).finally(() => {
        navigate('/')
      })
    } else {
      axios.post('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes', {
        fields: {
          title: { stringValue: title.trim() },
          ingredients: { stringValue: ingredients },
          method: { stringValue: method.trim() },
          cookingTime: { stringValue: time + ' minutes' },
          search: { stringValue: search.trim().toLowerCase() },
          author: { stringValue: loginData.username },
          authorid: { stringValue: loginData.id },
        }
      }, {
        headers: {
          //insert idToken
          Authorization: 'Bearer ' + loginData.idToken
        }
      }).finally(() => {
        navigate('/')
      })

    }

  }


  const addIngredientHandler = (e) => {
    e.preventDefault()

    if (ingredient === '') return

    let ingredientsArr = ingredient.split(',')

    //filter doesnt trim
    ingredientsArr = ingredientsArr.filter(item => {
      if (item.replace(/[^a-zA-Z0-9]/g, '').trim() !== '') {
        return item.trim()
      }
    })

    //so map is used
    ingredientsArr = ingredientsArr.map(item => {
      return item.trim()
    })

    let ingredientsString = ingredientsArr.join(', ')
    //removes last comma
    if (ingredientsString.endsWith(',')) ingredientsString = ingredientsString.slice(0, -1)

    setIngredients((prevIngredients) => {
      if (prevIngredients != '' && ingredientsString.trim() != '') {
        setIngredients(prevIngredients + ', ' + ingredientsString)
      } else {
        setIngredients(prevIngredients + ingredientsString)
      }

      setIngredient('')

    })
  }


  const inputHandler = (e, type) => {
    let input = e.target.value.replace(/ +(?= )/g, '');

    if (input === ' ') input = ''

    switch (type) {
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
        setTime(input.replace(/\D/g, ''))
        break;
    }
  }



  return <div className='create'>
    <h2 style={{ color: theme.createTitleTextColor }}>{edit? 'Edit your recipe' : 'Add a new recipe'}</h2>
    <form className='input-form' onSubmit={handleSubmit}>
      <label style={{ color: theme.createLabelTextColor }}>Recipe title:
        <input className='title-input' style={{ backgroundColor: theme.createInputBackgroundColor }} type='text' value={title} onChange={(e) => { inputHandler(e, 'title') }}></input>
      </label>
      <label style={{ color: theme.createLabelTextColor }}>Recipe ingredients:
        <div className='ingredients-wrapper'>
          <input className='ingredients-input' style={{ backgroundColor: theme.createInputBackgroundColor }} type='text' value={ingredient} onChange={(e) => { inputHandler(e, 'ingredient') }}></input>
          <button onClick={addIngredientHandler} className='add-btn'>add</button>
        </div>
      </label>
      <p style={{ color: theme.createCurrentIngredientsTextColor }}>Current ingredients: {ingredients ? ingredients : '[ Seperate with "," to add in bulk ]'}</p>
      <label style={{ color: theme.createLabelTextColor }}>Recipe method:
        <textarea className='method-input' style={{ backgroundColor: theme.createInputBackgroundColor }} type='text' value={method} onChange={(e) => { inputHandler(e, 'method') }}></textarea>
      </label>
      <label style={{ color: theme.createLabelTextColor }}>Cooking time (in minutes):
        <input className='time-input' style={{ backgroundColor: theme.createInputBackgroundColor }} type='text' value={time} onChange={(e) => { inputHandler(e, 'time') }}></input>
      </label>
      <button type='submit' className='submit-btn'>{edit ? 'update' : 'submit'}</button>
    </form>
  </div>;
}

export default Create