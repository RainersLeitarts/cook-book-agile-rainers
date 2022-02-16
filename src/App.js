import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavBar from './components/navbar/NavBar';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';
import { useContext } from 'react';
import { ThemeContext, navBarColors } from './hooks/useTheme';


function App() {
  const [{ theme }, toggleTheme, switchNavBarColor, toggleRandomTheme] = useContext(ThemeContext)
  let navColorButtons = Object.keys(navBarColors)

  console.log(theme)

  document.body.style = `background: ${theme.backgroundColorBody};`;

  return (
    <Router>
      <NavBar />
      <div className='theme-controls'>
        <div>
          {navColorButtons.map((key, index) => {
            return <button key={index} className={'toggle-nav-color'} style={{ backgroundColor: navBarColors[key].backgroundColor }} onClick={() => { switchNavBarColor(navBarColors[key].backgroundColor) }}> </button>
          })}
        </div>
        <button className={theme.name + ' toggle-button'} onClick={toggleTheme}>{theme.name}</button>
        <button className={'toggle-button'} onClick={toggleRandomTheme}>{'random'}</button>
      </div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/search' element={<Search />} />
        <Route path='/recipe/:id' element={<Recipe />} />
      </Routes>
    </Router>
  );
}

export default App;
