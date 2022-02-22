import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import RecipesList from '../../components/recipesList/RecipesList';
import useFetch from '../../hooks/useFetch';
import './Search.css'

const Search = () => {
  const [search] = useSearchParams()

  const searchTerms = search.get('q').toLowerCase().trim().split(' ')

  const { data, loading, error } = useFetch('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes', search.get('q'))




  if (data != null) {
    data.documents = data.documents.filter(item => {
      let score = 0
      let missing = []

      searchTerms.map(term => {
        if (item.fields.search.stringValue.includes(term)) {
          score++
        } else {
          missing.push(term)
        }
      })

      if (score !== 0) {
        item.fields['score'] = score
        if (missing.length !== 0) item.fields['missing'] = missing
        return item
      }
    })

    data.documents = data.documents.sort((a, b) => {
      return b.fields.score - a.fields.score
    })

    console.log(data.documents)
  }

  return <div className='wrapper'>
    {loading && <h1 className='loading'>Loading...</h1>}
    {error && <h1 className='error'>error</h1>}
    {data?.documents.length === 0 && <h1 className='noData'>No recipes found...</h1>}
    {data != undefined && <RecipesList data={data} />}
  </div>
};

export default Search;
