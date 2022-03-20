import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import './Create.css'
import { useNavigate } from 'react-router-dom'
import { ThemeContext } from '../../hooks/useTheme'

//since Create is used to also edit recipe it requires edit boolean and recipeInfo
const Create = ({ loginData, edit, editData }) => {
  //sets state for each field for recipe info
  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [ingredient, setIngredient] = useState('')
  const [method, setMethod] = useState('')
  const [time, setTime] = useState('')
  //theme context
  const [{ theme }] = useContext(ThemeContext)

  //runs once when page is loaded
  useEffect(() => {
    //if Create is used for editing recipe info states are set editable recipe info
    if (edit) {
      let tempIngredientsArray = editData.fields.ingredients.arrayValue.values.map(item => {
        return item.stringValue
      })

      setTitle(editData.fields.title.stringValue)
      setIngredients(tempIngredientsArray)
      setMethod(editData.fields.method.stringValue)
      setTime(editData.fields.cookingTime.stringValue.replaceAll(' minutes', ''))
    }
  }, [])

  //defines navigate
  const navigate = useNavigate()

  //handles form submition
  const handleSubmit = (e) => {
    //prevents page reload
    e.preventDefault()
    //checks if any of the fields are empty if true form is not submited
    if (title.trim() === '' || ingredients.length === 0 || method.trim() === '' || time === '') return
    //each word from title and method is put into search keyword array for search
    let search = title.trim() + ' ' + method.trim()

    let tempIngredients = ingredients.map(item => {
      return item = { stringValue: item }
    })

    

    //if Create is used for editing recipe patch request is sent else post request is sent to create new document
    if (edit) {
      axios.patch('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes/' + editData.name.split('/').pop() + '?updateMask.fieldPaths=title&updateMask.fieldPaths=ingredients&updateMask.fieldPaths=method&updateMask.fieldPaths=cookingTime&updateMask.fieldPaths=search', {
        fields: {
          title: { stringValue: title.trim() },
          ingredients: { arrayValue: { values: [tempIngredients] } },
          method: { stringValue: method.trim() },
          cookingTime: { stringValue: time + ' minutes' },
          search: { stringValue: search.trim().toLowerCase() },
        }
      }, {
        headers: {
          //insert idToken
          Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('loginData')).idToken
        }
      }).finally(() => {
        navigate('/')
      })
    } else {
      axios.post('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes', {
        fields: {
          title: { stringValue: title.trim() },
          ingredients: { arrayValue: { values: [tempIngredients] } },
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

    let ingredientsArr = ingredient.split('/')

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

    setIngredients((prevIngredients) => {
      setIngredients(prevIngredients.concat(ingredientsArr))
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

  const removeIngredientHandler = (e) => {
    e.preventDefault()
    let tempIngredients = ingredients

    tempIngredients = tempIngredients.filter(function (item) {
      return item !== e.target.innerText
    })

    setIngredients(tempIngredients)
  }

  return <div className='create'>
    <h2 style={{ color: theme.createTitleTextColor }}>{edit ? 'Edit your recipe' : 'Add a new recipe'}</h2>
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
      <p style={{ color: theme.createCurrentIngredientsTextColor }}>Current ingredients: {ingredients?.length != 0 ? ingredients?.map((item, key) => {
        return <button className='ingredient-btn' onClick={removeIngredientHandler} style={{ color: theme.createCurrentIngredientsTextColor }} key={key}>{item}</button>
      }) : '[ Seperate with "/" to add in bulk ]'}</p>
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