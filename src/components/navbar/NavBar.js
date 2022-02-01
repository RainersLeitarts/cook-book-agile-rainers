import { Link } from 'react-router-dom';
import './NavBar.css'
import SearchBar from '../searchBar/SearchBar';

const NavBar = () => {
  return <nav>
    <h1 className='title'>CookBook</h1>
    
    <div className='items'>
      <SearchBar/>
      <Link to='/create'><button>create recipe</button></Link>
    </div>
  </nav>;
};

export default NavBar;
