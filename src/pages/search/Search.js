import { useSearchParams } from 'react-router-dom';
import RecipesList from '../../components/recipesList/RecipesList';
import useFetch from '../../hooks/useFetch';
import './Search.css'

const Search = () => {
  const [search, setSearch] = useSearchParams()

  let arrayOfObjects = []
  let q = search.get('q').trim().toLowerCase()
  let array = q.split(' ')

  array.map(element => {
    if (arrayOfObjects.length < 10) arrayOfObjects.push({ stringValue: element })
  })

  const { data, loading, error } = useFetch(search, arrayOfObjects)
  return <div className='wrapper'>
    {loading && <h1 className='loading'>Loading...</h1>}
    {error && <h1 className='error'>error</h1>}
    {data && data[0].document === undefined && <h1 className='noData'>No recipes found...</h1>}
    {data && data[0].document != undefined && <RecipesList data={data} search={true} />}
  </div>
};

export default Search;
