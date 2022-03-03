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



function App() {
  const [{ theme }, toggleTheme, switchNavBarColor, toggleRandomTheme] = useContext(ThemeContext)
  let navColorButtons = Object.keys(navBarColors)

  document.body.style = `background: ${theme.backgroundColorBody};`;

  const [loginData, setLoginData] = useState(
    localStorage.getItem('loginData')
      ? JSON.parse(localStorage.getItem('loginData'))
      : null
  )

  const handleFailure = (result) => {
    alert(result)
  }

  const createUser = async (loginData) => {
    await axios.post('https://firestore.googleapis.com/v1/projects/cookboook-1a8ba/databases/(default)/documents/users', {
      fields: {
        email: { stringValue: loginData.email.trim() },
        fullname: { stringValue: loginData.name.trim() },
        username: { stringValue: loginData.name.trim() },
      }
    })
    console.log('User created!')

  }


  const getProfile = async (loginData) => {
    
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

    if (res.data[0].document != undefined) {
      console.log('here')
      return res.data[0].document
    } else {
      console.log('there')
      await createUser(loginData)
      return await getProfile(loginData)
    }
  }

  const handleSuccess = async (googleData) => {
    const res = await fetch('/api/google-login', {
      method: 'POST',
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();
    const profileData = await getProfile(data)
    let id = profileData.name.split('/').pop()

    console.log('ProfileData: ' + id)
    setLoginData({...data, id: id, fullname: profileData.fields.fullname.stringValue, username: profileData.fields.username.stringValue, bio: profileData.fields.bio?.stringValue});
    localStorage.setItem('loginData', JSON.stringify({...data, id: id, fullname: profileData.fields.fullname.stringValue, username: profileData.fields.username.stringValue, bio: profileData.fields.bio?.stringValue}));
  }

  const handleLogout = () => {
    localStorage.removeItem('loginData')
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
        </Route>
        <Route path='/search' element={<Search />} />
        <Route path='/recipe/:id' element={<Recipe />} />
      </Routes>
    </Router>
  );
}

export default App;
