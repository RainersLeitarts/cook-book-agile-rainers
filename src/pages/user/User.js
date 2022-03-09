import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import './User.css'
import axios from 'axios';
import RecipesList from '../../components/recipesList/RecipesList';
import { ThemeContext } from '../../hooks/useTheme';

const User = () => {
    let { id } = useParams();

    const [userData, setUserData] = useState({})
    const [userRecipes, setUserRecipes] = useState({})
    const [loading, setLoading] = useState(true)

    const [{ theme }] = useContext(ThemeContext)

    console.log(theme)

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
        {loading? <h1>Loading...</h1> : (<div><div style={{color: theme.createLabelTextColor}} className='username-wrapper'>
            <p style={{ color: theme.cardTitleTextColor }} className='fullname'>{userData.fields?.fullname.stringValue}</p>
            <p style={{color: theme.cardTitleTextColor, marginLeft: '0.5rem', marginRight: '0.5rem'}}>aka</p>
            <p style={{ color: theme.cardTitleTextColor }} className='username'>{userData.fields?.username.stringValue}</p>
        </div>
        <h1 style={{ color: theme.cardTitleTextColor }} className='email'>Email: {userData.fields?.email.stringValue}</h1>
        <h1 style={{ color: theme.cardTitleTextColor }} className='bio'>Bio: {userData.fields?.bio?.stringValue? userData.fields?.bio?.stringValue: 'user hasn\'t added bio'}</h1>
        <h1 style={{ color: theme.cardTitleTextColor }} className='user-recipes'>{userData.fields?.username.stringValue + '\'s recipes:'}</h1>
        <div>{userRecipes ? <RecipesList data={userRecipes} /> : console.log("no data")}</div></div>)}
    </div>
    )
}

export default User