import React from 'react'
import './Search.css';
import { Link, useHistory } from 'react-router-dom';


const Search: React.FC = () => {

  const [searchValue, setSearchValue] = React.useState('');

  const history = useHistory();

  const handleSearchSubmit = (e) => {
    if (e.keyCode === 13) {
      console.log(e.target.value);
      console.log("it worked!")
    }
  }

  const handleClearSearch = (e) => {
    if (e.keyCode === 8) {
      history.GoBack();
    }
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value)
    history.push({
        pathname: '/search/1',
        state: {
            query: searchValue
        }
    })
    handleClearSearch(e);
    if (searchValue.length <= 1) {
      history.push('/');
    }
}


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
                onChange={handleSearch}
              />
              <label className="button search-button" htmlFor="search-right"><i className='fas fa-search'></i></label>
          </div>
        </div>
      
    </> 
  )
}

export default Search;
