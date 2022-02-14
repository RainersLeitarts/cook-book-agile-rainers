import { useNavigate} from 'react-router-dom';
import './NavBar.css'
import SearchBar from '../searchBar/SearchBar';
import { useContext } from 'react';
import { ThemeContext } from '../../hooks/useTheme';
import { Children } from 'react/cjs/react.production.min';


const NavBar = () => {
  const navigate = useNavigate()
  const [{navBarColor}] = useContext(ThemeContext)

  console.log(navBarColor)

  return <nav style={{backgroundColor: navBarColor.backgroundColor}}>
      <div className='nav-wrapper' style={{backgroundColor: navBarColor.backgroundColor}}>
      <h1 className='title' onClick={() => navigate('/')}>CookBook</h1>
        <div className='items'>
          <SearchBar/>
          <button onClick={() => navigate('/create')} className='create-btn'>create recipe</button>
          </div>
        </div>
    </nav>;
};

export default NavBar;
