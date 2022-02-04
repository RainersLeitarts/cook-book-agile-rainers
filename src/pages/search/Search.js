import { useSearchParams } from 'react-router-dom';
import RecipesList from '../../components/recipesList/RecipesList';
import useFetch from '../../hooks/useFetch';
import './Search.css'

const Search = () => {
  const [search, setSearch] = useSearchParams()

  const {data, loading, error} = useFetch(`http://localhost:3003/recipes?q=${search.get('q')}`)
  console.log(data);

  return <div className='wrapper'>
      {loading && <h1 className='loading'>Loading...</h1>}
      {error && <h1 className='error'>error</h1>}
      {data && data.length === 0 && <h1 className='noData'>No recipes found...</h1>}
      {data && <RecipesList data={data}/>}
    </div>
};

export default Search;
