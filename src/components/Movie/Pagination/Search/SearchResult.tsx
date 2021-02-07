import React, { useState, useEffect } from 'react';
import SearchPagination from './SearchPagination'
import axios from 'axios'
import SearchItem from './SearchItem';
import Loading from '../../../loading';
import './SearchResult.css';
import NoResultFound from '../Filter/NoResultFound';
import { useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const SearchResult = () => {  

  const { getAccessTokenSilently } = useAuth0();
  const location = useLocation();

  const [page, setPage] = useState(1)
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentButton, setCurrentButton] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [rating, setRating] = useState([0, 10])
  const [ratingAsc, setRatingAsc] = useState('true');
  const [year, setYear] = useState<string>('false');
  const [language, setLanguage] = useState<string>('default');
  const [type, setType] = useState<string>('default');
  const [rated, setRated] = useState<string>('default');
  const [genre, setGenre] = useState<string>('default'); 

  /* =====================GET INITIAL SEARCH======================== */

  const getMovieRequest = async () => {

    const token = await getAccessTokenSilently();

    console.log(token);

    setLoading(true)
    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/movies/page/${currentButton}/filter/v3/?rating=0-10&ascR=true&year=1891-2016&ascY=false&genre=default&language=default&type=default&rated=default&search=${location.state.query}`)
    .then(response => {
        const { movies: results } = response.data.data;
        const { totalNumberOfPages: pages} = response.data.data;
        setMovies(results);
        if (pages > 999) {
          setTotalPages(999);
        } else {
          setTotalPages(pages);
        }
        console.log(movies)
        setLoading(false)
    })
    .catch((err) => console.log(err));
  }

  /* =================USEEFFECT FOR FIRST================ */

  useEffect(() => {
    getMovieRequest();
  }, [location.state.query])

  /* =====================USE EFFECT FOR PAGINATION =============================== */

  useEffect(() => {
    changePagination();
  }, [totalPages])

  /* ==========================GETS CURRENT POST==================================== */

  const fetchCurrentPagePost = async (currentButton) => {
    setLoading(true)
    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/movies/page/${currentButton}/filter/v3/?rating=0-10&ascR=true&year=1891-2016&ascY=false&genre=default&language=default&type=default&rated=default&search=${location.state.query}`)
    .then(result => {
      const { movies: results } = result.data.data;
      console.log(results);
      setMovies(results);
      setLoading(false);
    })
    .catch(err => console.log(err));
  }

  /* ========================USEEFFECT FOR CURRENT POST================================= */

  useEffect(() => {
    getMovieRequest()
  }, [])


  /* ==============================USEEFFECT FOR CHANGES IN PAGE========================================= */
    
  useEffect(() => {
    fetchCurrentPagePost(currentButton);
  }, [currentButton])

  
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

