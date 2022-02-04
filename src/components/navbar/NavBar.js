import { Link, useNavigate} from 'react-router-dom';
import './NavBar.css'
import SearchBar from '../searchBar/SearchBar';

const NavBar = () => {
  const navigate = useNavigate()

  return <nav>
      <div className='nav-wrapper'>
      <h1 className='title' onClick={() => navigate('/')}>CookBook</h1>
        <div className='items'>
          <SearchBar/>
          <button onClick={() => navigate('/create')} className='create-btn'>create recipe</button>
          </div>
        </div>
    </nav>;
};

export default NavBar;
