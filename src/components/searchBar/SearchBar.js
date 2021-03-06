import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.css'

const SearchBar = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const inputHandler = (e) =>{
    let input = e.target.value.replace(/ +(?= )/g, '');
    if(input === ' ') input = ''
    setSearchTerm(input)
  }

  const search = (searchTerm)=>{
    searchTerm = searchTerm.replace(/[^a-zA-Z ]/g, "").trim()
    
    if (searchTerm === '') return
    navigate(`/search?q=${searchTerm}`)
    setSearchTerm('')
  }

  const keyPressHandler = (e)=>{
    if (e.key === "Enter") {
      search(searchTerm)
    }
  }

  return <div>
    <label className='search'>Search: </label>
    <input className='searchbox' type='text' onChange={inputHandler} onKeyPress={keyPressHandler} value={searchTerm}></input>
    <button className='search-btn' onClick={() => search(searchTerm)}>Search</button>
  </div>;
};

export default SearchBar;
