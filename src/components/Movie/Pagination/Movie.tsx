import React, { useState, useEffect } from 'react';
import Pagination from './Pagination'
import axios from 'axios'
import MovieItem from './MovieItem';
import Loading from '../../loading';
import './Movie.css';
import MovieHero from './MovieHero'
import { useHistory } from 'react-router-dom';

const Movie: React.FC = () => {

  const [movies, setMovies] = useState<Array<object>>([])
  const [loading, setLoading] = useState<boolean>(false) 
  const [totalPages, setTotalPages] = useState<number>(1);

  const [currentButton, setCurrentButton] = useState<number>(1)

  const [currentPage, setCurrentPage] = useState<number>(currentButton)

  /* ======================================================================= */

  
  useEffect(() => {

    const fetchPosts = async () => {
      setLoading(true)
      await axios
      .get(`${process.env.REACT_APP_BASE_URL}${window.location.pathname}`)
      .then(result => {
        const results = result.data.data.movies;
        console.log(results);
        setMovies(results)
        setLoading(false);
        if (result.data.data.totalNumberOfPages > 999) {
          setTotalPages(999)
        } else {
          setTotalPages(result.data.data.totalNumberOfPages);
        }
        const curNum = `${window.location.pathname}`;
        setCurrentButton(parseInt(curNum.slice(13)));
      })
      .catch(err => console.log(err));
    }
    fetchPosts();
  }, []);

  
  /* ======================================================================= */

  const numberOfPages: Array<number>  = []
  for (let i = 1; i <= totalPages; i++) {
    numberOfPages.push(i)
  }
  // Current active button number

  // Array of buttons what we see on the page
  const [arrOfCurrButtons, setArrOfCurrButtons] = useState<Array<number>>([])

  const changePagination = () => {
    
    let tempNumberOfPages: Array<any> = [...arrOfCurrButtons]


    let dotsInitial = '...'
    let dotsLeft = '... '
    let dotsRight = ' ...'


    if (numberOfPages.length < 20) {
      tempNumberOfPages = [1, 2, 3, 4, dotsInitial, 999]
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

  const fetchCurrentPagePost = async (currentButton) => {
    console.log(currentButton, "hello");
    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/movies/page/${currentButton}`)
    .then(result => {
      const results = result.data.data.movies;
      console.log(results);
      setMovies(results)
      setLoading(false);
    })
    .catch(err => console.log(err));
  }

    /* ======================================================================= */
    
  useEffect(() => {
    changePagination();
    fetchCurrentPagePost(currentButton);
  }, [currentButton])


  if (loading && movies.length === 0) {
    return <Loading />
  }
  
  return (
    <div className="movie-container">
      <MovieHero movies={movies} />
      <div className='poster-container'>
        <MovieItem movies={movies} /> 
      </div>
      <div className='pagination-container'>
      <Pagination 
          currentButton={currentButton} 
          setCurrentButton={setCurrentButton} 
          numberOfPages={numberOfPages}
          arrOfCurrButtons={arrOfCurrButtons}
        />
      </div>
    </div>
  );
}

export default Movie;