import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import axios from 'axios';
import NavBar from './components/navbar/NavBar';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';
import { useContext, useState } from 'react';
import { ThemeContext, navBarColors } from './hooks/useTheme';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';
import Profile from './pages/profile/Profile';
import User from './pages/user/User';
import Edit from './pages/Edit/Edit';



function App() {
  //theme information context
  const [{ theme }, toggleTheme, switchNavBarColor, toggleRandomTheme] = useContext(ThemeContext)
  //navBar color object keys used to render navBar color buttons
  let navColorButtons = Object.keys(navBarColors)
  //sets body background color
  document.body.style = `background: ${theme.backgroundColorBody};`;

  //login data state, initialized from localStorage loginData if it is present else is null
  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  )

  //handles login Failure
  const handleFailure = (result) => {
    alert(result)
  }

  //creates user profile if it is not present
  const createUser = async (loginData) => {
    await axios.post(`https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/users?documentId=${loginData.localId}`, {
      fields: {
        email: { stringValue: loginData.email.trim() },
        fullname: { stringValue: loginData.displayName.trim() },
        username: { stringValue: loginData.displayName.trim() },
      }
    })
  }


  const getProfile = async (loginData) => {
    //looks for profile un users collection with the same email
    const res = await axios.post('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents:runQuery',
      {
        structuredQuery: {
          from: [{ collectionId: 'users' }],
          where: {
            fieldFilter: {
              field: {
                fieldPath: 'email'
              },
              op: 'EQUAL',
              value: { stringValue: loginData.email }
            }
          }
        }
      }
    )

    //if profile is found profile data is returned
    if (res.data[0].document != undefined) {
      return res.data[0].document
    } else {
      //if user profile is not found it is created
      await createUser(loginData)
      return await getProfile(loginData)
    }
  }

  //handles successful login, uses GoogleData from google login
  const handleSuccess = async (googleData) => {
    //post request to authorize in firebase with Idp, Google login tokenId must be provided
    const res = await axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithIdp?key=${process.env.REACT_APP_FIREBASE_API_KEY}`,
    {"postBody":`id_token=${googleData.tokenId}&providerId=google.com`,"requestUri":"https://cookbook-agile-rewidle.herokuapp.com","returnIdpCredential":true,"returnSecureToken":true}
    )

    const data = res.data;

    //gets user profile data from users collection
    const profileData = await getProfile(data)
    //gets userId
    let id = profileData.name.split('/').pop()

    //sets LoginData state with all of the users information
    setLoginData({...data, id: id, fullname: profileData.fields.fullname.stringValue, username: profileData.fields.username.stringValue, bio: profileData.fields.bio?.stringValue});
    //stores LoginData in LocalStorage
    localStorage.setItem('loginData', JSON.stringify({...data, id: id, fullname: profileData.fields.fullname.stringValue, username: profileData.fields.username.stringValue, bio: profileData.fields.bio?.stringValue}));
  }

  //handles logout
  const handleLogout = () => {
    //removes LoginData from LocalStorage
    localStorage.removeItem('loginData')
    //sets LoginData state to null
    setLoginData(null)
  }


  return (
    <Router>
      <NavBar handleSuccess={handleSuccess} handleFailure={handleFailure} handleLogout={handleLogout} loginData={loginData} />
      <div className='theme-controls'>
        <div>
          {navColorButtons.map((key, index) => {
            return <button key={index} className={'toggle-nav-color'} style={{ backgroundColor: navBarColors[key].backgroundColor }} onClick={() => { switchNavBarColor(navBarColors[key].backgroundColor) }}> </button>
          })}
        </div>
        <button className={theme.name + ' toggle-button'} onClick={toggleTheme}>{theme.name}</button>
        <button className={'random toggle-button'} onClick={toggleRandomTheme}>{'🎨'}</button>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route element={<ProtectedRoutes isAuthorised={loginData ? true : false} />}>
          <Route path='/create' element={<Create loginData={loginData} />} />
          <Route path='/profile' element={<Profile loginData={loginData} setLoginData={setLoginData}/>} />
          <Route path='/edit/:id' element={<Edit loginData={loginData}/>}/>
        </Route>
        <Route path='/search' element={<Search />} />
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path='/user/:id' element={<User/>}/>
      </Routes>
    </Router>
  );
}

export default App;
