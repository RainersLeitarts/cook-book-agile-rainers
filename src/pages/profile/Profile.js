import { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import { ThemeContext } from '../../hooks/useTheme';
import RecipesList from '../../components/recipesList/RecipesList';



const Profile = ({ loginData, setLoginData }) => {

    const [fullname, setFullname] = useState(loginData.fullname)
    const [username, setUsername] = useState(loginData.username)
    const [bio, setBio] = useState(loginData.bio ? loginData.bio : '')

    const [myRecipes, setMyRecipes] = useState({})
    const [found, setFound] = useState(false)

    useEffect(() => {
        getMyRecipes()
    }, [])

    const [{ theme }] = useContext(ThemeContext)

    const updateUser = (e) => {
        e.preventDefault()

        axios.patch('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/users/' + loginData.id + '?updateMask.fieldPaths=fullname&updateMask.fieldPaths=username&updateMask.fieldPaths=bio', {
            fields: {
                fullname: { stringValue: fullname },
                username: { stringValue: username },
                bio: { stringValue: bio }
            }
        })

        updateMyRecipesAuthor()

        setLoginData({ ...loginData, fullname: fullname, username: username, bio: bio });
        localStorage.setItem('loginData', JSON.stringify({ ...loginData, fullname: fullname, username: username, bio: bio }));
    }

    const getMyRecipes = async () => {
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
                            value: { stringValue: loginData.id }
                        }
                    }
                }
            }
        )

        let data = { documents: res.data }
        
        if(data.documents[0].document == undefined || data.documents[0].document.fields == undefined) return
        
        let innerdata = { data }
        let temp = innerdata.data.documents.map(document => {
            return document.document
        })
        data = { documents: temp }
        setMyRecipes(data)
        setFound(true)
        return data
    }

    const updateMyRecipesAuthor = () =>{
        myRecipes.documents.map(doc => {
            axios.patch('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/recipes/' + doc.name.split('/').pop() + '?updateMask.fieldPaths=author', {
                fields: {
                    author: { stringValue: username }
                }
            })
        })
        
    }

    const inputHandler = (e, type) => {
        let input = e.target.value.replace(/ +(?= )/g, '');

        if (input === ' ') input = ''

        switch (type) {
            case 'fullname':
                setFullname(input)
                break;
            case 'username':
                setUsername(input)
                break;
            case 'bio':
                setBio(input)
                break;
        }
    }


    return (
        <div className='create'>
            <h2 style={{ color: theme.createTitleTextColor }}>{fullname}</h2>
            <form className='input-form'>
                <label style={{ color: theme.createLabelTextColor }}>Full name:
                    <input className='title-input' style={{ backgroundColor: theme.createInputBackgroundColor }} onChange={(e) => { inputHandler(e, 'fullname') }} value={fullname} type='text' ></input>
                </label>
                <label style={{ color: theme.createLabelTextColor }}>Nickname:
                    <input className='title-input' style={{ backgroundColor: theme.createInputBackgroundColor }} onChange={(e) => { inputHandler(e, 'username') }} value={username} type='text' ></input>
                </label>
                <label style={{ color: theme.createLabelTextColor }}>Email:
                    <input className='title-input' readOnly={true} style={{ backgroundColor: theme.createInputBackgroundColor }} defaultValue={loginData.email} type='text' ></input>
                </label>
                <label style={{ color: theme.createLabelTextColor }}>Bio:
                    <textarea className='method-input' placeholder='Add bio' style={{ backgroundColor: theme.createInputBackgroundColor }} onChange={(e) => { inputHandler(e, 'bio') }} value={bio}></textarea>
                </label>
                <button type='submit' onClick={updateUser} className='submit-btn'>Update</button>
            </form>
            <h1 style={{color: theme.createInputBackgroundColor}}>My recipes: </h1>
            <div className='wrapper'>
                {found? <RecipesList data={myRecipes} /> : <h1 className='noData'>No recipes found...</h1>}

            </div>
        </div>
    )
}

export default Profile