import { useSearchParams } from 'react-router-dom';
import RecipesList from '../../components/recipesList/RecipesList';
import useFetch from '../../hooks/useFetch';
import './Search.css'

const Search = () => {
  const [search, setSearch] = useSearchParams()

  console.log(search.get('q'));
  let arrayOfObjects = []
  let q = search.get('q').trim().toLowerCase()
  console.log(q);
  let array = q.split(' ')
  console.log(array);
  array.map(element => {
    if (arrayOfObjects.length < 10) arrayOfObjects.push({ stringValue: element })
  })
  

  console.log(arrayOfObjects);




  const { data, loading, error } = useFetch(search.get('q'), arrayOfObjects)
  if (data != null) console.log(data[0].document);
  return <div className='wrapper'>
    {loading && <h1 className='loading'>Loading...</h1>}
    {error && <h1 className='error'>error</h1>}
    {data && data[0].document === undefined && <h1 className='noData'>No recipes found...</h1>}
    {data && data[0].document != undefined && <RecipesList data={data} search={true} />}
  </div>
};

export default Search;
