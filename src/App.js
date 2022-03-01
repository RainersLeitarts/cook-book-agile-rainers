import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';
import { useContext, useState } from 'react';
import { ThemeContext, navBarColors } from './hooks/useTheme';
import ProtectedRoutes from './components/protectedRoutes/ProtectedRoutes';


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
    setLoginData(data);
    localStorage.setItem('loginData', JSON.stringify(data));
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
          <Route path='/create' element={<Create loginData={loginData}/>} />
        </Route>
        <Route path='/search' element={<Search />} />
        <Route path='/recipe/:id' element={<Recipe />} />
      </Routes>
    </Router>
  );
}

export default App;
