import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import './Recipe.css'

const Recipe = () => {
  let { id } = useParams();

  const {data, loading, error} = useFetch(`http://localhost:3003/recipes/${id}`)

  if(loading) return <h1>Loading...</h1>

  if(error) return <h1>Error...</h1>

  if (data != null) {
    return <div key={data.id} className='recipe-card'>
            <h1 className='recipe-title'>{data.title}</h1>
            <h3 className='cooking-time'>{`${data.cookingTime} to make.`}</h3>
            <p className='cooking-method'>{data.method}</p>
          </div>
  }else{
    return <div></div>
  }
};

export default Recipe;
