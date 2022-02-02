import { Link } from 'react-router-dom';
import './NavBar.css'
import SearchBar from '../searchBar/SearchBar';

const NavBar = () => {
  return <nav>
    <Link to='/'><h1 className='title'>CookBook</h1></Link>
    
    <div className='items'>
      <SearchBar/>
      <Link to='/create'><button>create recipe</button></Link>
    </div>
  </nav>;
};

export default NavBar;
