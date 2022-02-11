import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import NavBar from './components/navbar/NavBar';
import Home from './pages/home/Home';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Recipe from './pages/recipe/Recipe';
import { useContext } from 'react';
import { ThemeContext } from './theme-context';

function App() {
  const [{theme, isDark}, toggleTheme] = useContext(ThemeContext)
  console.log(theme)

  
  document.body.style = `background: ${theme.backgroundColorBody};`;


  return (
    <Router>
      <NavBar/>
      <div className='theme-controls'>
        <button className={(isDark ? 'dark': 'light') + ' toggle-button'} onClick={toggleTheme}>{isDark ? 'light' : 'dark'}</button>
      </div>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/create' element={<Create/>}/>
        <Route path='/search' element={<Search/>}/>
        <Route path='/recipe/:id' element={<Recipe/>}/>
      </Routes>
    </Router>
  );
}

export default App;
