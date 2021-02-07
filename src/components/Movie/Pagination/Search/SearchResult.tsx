import React, { useState, useEffect } from 'react';
import SearchPagination from './SearchPagination'
import axios from 'axios'
import SearchItem from './SearchItem';
import Loading from '../../../loading';
import './SearchResult.css';
import NoResultFound from '../Filter/NoResultFound';
import { useLocation } from 'react-router-dom';

const SearchResult = () => {  

  const location = useLocation();
  console.log(location.state.query)

  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentButton, setCurrentButton] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1)

  const getMovieRequest = async (page) => {
    setLoading(true)
    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/movies/page/${page}/search?query=${location.state.query}`)
    .then(response => {
        const { movies: results } = response.data.data;
        setMovies(results);
        console.log(movies)
        setLoading(false)
    })
    .catch((err) => console.log(err));
  }

  useEffect(() => {
      getMovieRequest(page);
  }, [location.state.query])

  useEffect(() => {
    changePagination();
  }, [totalPages])

  
  /* ==============================ADJUSTS THE PAGINATION========================================= */

  let numberOfPages: Array<number>  = [];

  for (let i = 1; i <= totalPages; i++) {
    numberOfPages.push(i)
  }

  const [arrOfCurrButtons, setArrOfCurrButtons] = useState<Array<number>>([])

  const changePagination = () => {
    
    let tempNumberOfPages: Array<any> = [...arrOfCurrButtons]


    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'


    if (numberOfPages.length < 6) {
      tempNumberOfPages = numberOfPages
    }
    
    else if (currentButton >= 1 && currentButton <= 3) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, numberOfPages.length]
    }

    else if (currentButton === 4) {
      const sliced = numberOfPages.slice(0, 5)
      tempNumberOfPages = [...sliced, dotsInitial, numberOfPages.length]
    }

    else if (currentButton > 4 && currentButton < (numberOfPages.length - 2)) {      
      const sliced1 = numberOfPages.slice(currentButton - 2, currentButton)               
      const sliced2 = numberOfPages.slice(currentButton, currentButton + 1)        
      tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, numberOfPages.length]) 
    }
    
    else if (currentButton > numberOfPages.length - 3) {                 // > 7
      const sliced = numberOfPages.slice(numberOfPages.length - 4)       // slice(10-4) 
      tempNumberOfPages = ([1, dotsLeft, ...sliced])                        
    }
    
    else if (!currentButton === !dotsInitial) {
      setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length-3] + 1) 
    }
    else if (!currentButton === !dotsRight) {
      setCurrentButton(arrOfCurrButtons[3] + 2)
    }

    else if (!currentButton === !dotsLeft) {
      setCurrentButton(arrOfCurrButtons[3] - 2)
    }

    setArrOfCurrButtons(tempNumberOfPages)
    setCurrentButton(currentButton)
    setCurrentPage(currentButton)
  }

  const movieResults = () => {
    if (movies === undefined) {
      return <NoResultFound />
    } else {
      return (
        <>
        <div className='poster-container'>
          <SearchItem movies={movies} /> 
        </div>
        <div className='pagination-container'>
        <SearchPagination 
            currentButton={currentButton} 
            setCurrentButton={setCurrentButton} 
            numberOfPages={numberOfPages}
            arrOfCurrButtons={arrOfCurrButtons}
          />
        </div>
        </>
      )
      
    }
  }


  
  return (
    <>
    { loading ? <Loading /> : <div className='search-result movie-result'>{movieResults()}</div>}
    </>
  );
}

export default SearchResult;

