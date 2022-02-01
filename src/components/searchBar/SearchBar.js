import { Link } from 'react-router-dom';
import './SearchBar.css'

const SearchBar = () => {
  return <div>
    <label>Search: </label>
    <input className='searchbox' type='text' ></input>
    <Link to='/search'><button className='search-btn'>Search</button></Link>
  </div>;
};

export default SearchBar;
