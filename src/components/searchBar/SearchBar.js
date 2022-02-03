import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './SearchBar.css'

const SearchBar = () => {
  let navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const inputHandler = (e) =>{
    setSearchTerm(e.target.value)
  }

  const search = (searchTerm)=>{
    searchTerm = searchTerm.replace(/\s+/g, ' ').trim()
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
