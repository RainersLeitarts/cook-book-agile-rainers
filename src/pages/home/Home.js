import RecipesList from '../../components/recipesList/RecipesList';
import useFetch from '../../hooks/useFetch';
import './Home.css'

const Home = () => {
  const {data, loading, error} = useFetch('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes')

    return <div className='wrapper'>
      {loading && <h1 className='loading'>Loading...</h1>}
      {error && <h1 className='error'>error</h1>}
      {data && <RecipesList data={data}/>}
    </div>
}

export default Home;
