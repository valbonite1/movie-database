import React from 'react'
import './Search.css';

type searchProps = {
  setSearchValue: (value: string) => void
}

const Search: React.FC<searchProps> = ({ setSearchValue }) => {
  return (
    <>
      <div className='search-wrapper'>
        <div className="search-container">
            <input 
              className="search expand-right" 
              id="search-right" 
              type="search" 
              name="q" 
              placeholder="Titles, directors, actors, plot" 
              onChange={(event) => setSearchValue(event.target.value)}
            />
            <label className="button search-button" htmlFor="search-right"><i className='fas fa-search'></i></label>
        </div>
      </div>
    </> 
  )
}

export default Search;
