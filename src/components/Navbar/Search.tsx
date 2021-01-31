import React, { useState } from 'react'
import './Search.css';

const Search: React.FC = () => {
  return (
    <>
      <div className='search-wrapper'>
        <div className="search-container">
            <input className="search expand-right" id="search-right" type="search" name="q" placeholder="Titles, directors, actors, plot" />
            <label className="button search-button" htmlFor="search-right"><i className='fas fa-search'></i></label>
        </div>
      </div>
    </> 
  )
}

export default Search;
