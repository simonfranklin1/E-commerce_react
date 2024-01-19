import React from 'react'
import { BsSearch } from 'react-icons/bs'
import "./SearchBar.css"
import { useNavigate } from 'react-router-dom'
import { useState, useContext } from 'react'
import { StoreContext } from '../context/StoreContext'

const SearchBar = () => {
  const { checkout, setLoading, setQuery } = useContext(StoreContext);

  const [ search, setSearch ] = useState('');
  const navigate = useNavigate();

  const handleSearchValue = (e) => {
    e.preventDefault();
    setLoading(true);

    navigate("/search ?q=" + search);
    setSearch('');
    setQuery(search);
  }

  return (
    <form className={`search-bar ${checkout? 'hidden' : ''}`} onSubmit={handleSearchValue} >
        <span>
          <BsSearch />
        </span>
        <input 
          type="text" 
          placeholder='Oque você está procurando?'
          name='search-input' 
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
          required 
        />
    </form>
  )
}

export default SearchBar