import { useContext } from 'react'
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import { ThemeContext } from '../../hooks/useTheme';
import Create from '../create/Create'

const Edit = ({loginData}) => {
    let { id } = useParams();
    const [{ theme }] = useContext(ThemeContext)

    console.log(loginData)
    const { data, loading, error } = useFetch(`https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes/${id}`)

    console.log(data? /[^/]*$/.exec(data.name)[0] : '')
    console.log()

    if(/[^/]*$/.exec(data?.fields.authorid.stringValue)[0] == loginData.id){
        console.log('true')
    }else{
        return (
            <div className='wrapper'>
                <h1 style={{color: theme.cardMissingColor}}>Not your recipe</h1>
            </div>
        )
    }

    return (
        <div>
            <Create edit={true} editData={data}/>
        </div>
    )
}

export default Edit