import { Link, useNavigate} from 'react-router-dom';
import './NavBar.css'
import SearchBar from '../searchBar/SearchBar';

const NavBar = () => {
  const navigate = useNavigate()

  return <nav>
      <h1 className='title' onClick={() => navigate('/')}>CookBook</h1>
        <SearchBar/>
        <button onClick={() => navigate('/create')}>create recipe</button>
    </nav>;
};

export default NavBar;
