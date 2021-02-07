import React, { useState, useEffect } from 'react';
import './SearchPagination.css'
import { Link } from 'react-router-dom';

type Pagination = {
  numberOfPages: number[],
  arrOfCurrButtons: Array<number>
  setCurrentButton: (value: number | any) => void,
  currentButton: number,
}

const SearchPagination: React.FC<Pagination> = ({
  arrOfCurrButtons, 
  numberOfPages,
  setCurrentButton, 
  currentButton,
}) => {

  const changeRoute = () => {
    window.scrollTo(700, 700)
  }

  const prevClicked = () => {
    setCurrentButton(currentButton -1)
    changeRoute()
  }

  const nextClicked = () => {
    setCurrentButton(currentButton + 1)
    changeRoute()
  }

  return (
    <div className="pagination-container">
      <Link
        to={`/search/${currentButton - 1}`}
        className={`${currentButton === 1 ? 'disabled' : ''}`}
        onClick={prevClicked}
      >
        Prev
      </Link>

      {arrOfCurrButtons.map(((item, index) => {
        const midClicked = () => {
          setCurrentButton(item)
          changeRoute()
        }
        return (
          <Link
            to={`/search/${item}`}
            key={index}
            className={`${currentButton === item ? 'active' : ''}`}
            onClick={midClicked}
          >
            {item}
          </Link>
        )
      }))}

      <Link
        to={`/search/${currentButton + 1}`}
        className={`${currentButton === numberOfPages.length ? 'disabled' : ''}`}
        onClick={nextClicked}
      >
        Next
      </Link>
    </div>
  );
}


export default SearchPagination;