import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { ThemeContext } from '../../hooks/useTheme';
import Create from '../create/Create'

const Edit = ({loginData}) => {
    //grabs recipe id from the link using useParams
    let { id } = useParams();
    //theme context
    const [{ theme }] = useContext(ThemeContext)
    //using useFetch to get recipe info
    const { data, loading, error } = useFetch(`https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes/${id}`)

    //checks if logged in user is the author of the recipe if false notifies user
    if(/[^/]*$/.exec(data?.fields.authorid.stringValue)[0] != loginData.id){
        return (
            <div className='wrapper'>
                {data? <h1 style={{color: theme.cardMissingColor}}>Not your recipe</h1> : <h1 style={{color: theme.cardMissingColor}}>Loading...</h1>}
            </div>
        )
    }

    //Create is reused to edit recipe info
    return (
        <div>
            <Create edit={true} editData={data}/>
        </div>
    )
}

export default Edit