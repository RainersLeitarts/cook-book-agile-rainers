import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './User.css'
import axios from 'axios';
import RecipesList from '../../components/recipesList/RecipesList';

const User = () => {
    let { id } = useParams();

    const [userData, setUserData] = useState({})
    const [userRecipes, setUserRecipes] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        setLoading(true)
        const userDataRes = await axios.get('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/users/' + id)
        setUserData(userDataRes.data)

        console.log(userDataRes.data)
        const res = await axios.post('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents:runQuery',
            {
                structuredQuery: {
                    from: [{ collectionId: 'recipes' }],
                    where: {
                        fieldFilter: {
                            field: {
                                fieldPath: 'authorid'
                            },
                            op: 'EQUAL',
                            value: { stringValue: id }
                        }
                    }
                }
            }
        )

        let data = { documents: res.data }

        if (data.documents[0].document == undefined || data.documents[0].document.fields == undefined) return

        let innerdata = { data }
        let temp = innerdata.data.documents.map(document => {
            return document.document
        })
        data = { documents: temp }
        //setUserRecipes(data)

        setUserRecipes(data)
        console.log(data)
        setLoading(false)
    }

   

    return (<div className='wrapper'>
        {loading? <h1>Loading...</h1> : (<><div className='username-wrapper'>
            <p className='fullname'>{userData.fields?.fullname.stringValue}</p>
            <p style={{marginLeft: '0.5rem', marginRight: '0.5rem'}}>aka</p>
            <p className='username'>{userData.fields?.username.stringValue}</p>
        </div>
        <h1 className='email'>Email: {userData.fields?.email.stringValue}</h1>
        <h1 className='bio'>Bio: {userData.fields?.bio.stringValue}</h1>
        <h1 className='user-recipes'>{userData.fields?.username.stringValue + '\'s recipes:'}</h1>
        <div>{userRecipes ? <RecipesList data={userRecipes} /> : console.log("no data")}</div></>)}

        
    </div>
    )
}

export default User