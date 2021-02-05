import React, { useState, useEffect } from 'react';
import Pagination from './Pagination'
import axios from 'axios'
import MovieItem from './MovieItem';
import Loading from '../../loading';
import './Movie.css';
import MovieHero from './MovieHero'
import AdvanceFilter from './Filter/AdvanceFilter';

const Movie: React.FC = () => {

  const [movies, setMovies] = useState<Array<object>>([])
  const [loading, setLoading] = useState<boolean>(false) 
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentButton, setCurrentButton] = useState<number>(1)
  const [currentPage, setCurrentPage] = useState<number>(currentButton)
  const [genre, setGenre] = useState<string>('default');
  const [year, setYear] = useState<string>('false');
  const [language, setLanguage] = useState<string>('default');
  const [type, setType] = useState<string>('default');
  const [rated, setRated] = useState<string>('default');
  const [isModal, setModal] = useState<boolean>(false);
  const [languageList, setLanguageList] = useState<Array<string>>([])
  /* ==============================GETS DATA OF CURRENT PAGE========================================= */

  
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
        if (result.data.totalNumberOfPages > 999) {
          setTotalPages(999)
        } else {
          setTotalPages(result.data.totalNumberOfPages);
        }
        const curNum = `${window.location.pathname}`;
        setCurrentButton(parseInt(curNum.slice(13)));
      })
      .catch(err => console.log(err));
    }
    fetchPosts();
    getLanguages();
  }, []);

  
  /* ==============================ADJUSTS THE PAGINATION========================================= */

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


  /* ==============================GETS CURRENT POST========================================= */

  const fetchCurrentPagePost = async (currentButton) => {
    console.log(currentButton, "hello");
    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/movies/page/${currentButton}/filter?filterBy=year&asc=${year}&genre=${genre}&language=${language}&type=${type}&rated=${rated}`)
    .then(result => {
      const results = result.data.data.movies;
      console.log(results);
      setMovies(results)
      setLoading(false);
    })
    .catch(err => console.log(err));
  }

    /* ==============================USEEFFECT FOR CHANGES IN PAGE========================================= */
    
  useEffect(() => {
    changePagination();
    fetchCurrentPagePost(currentButton);
  }, [currentButton])

  /* ================================LOAD BEFORE DATA======================================= */

  if (loading && movies.length === 0) {
    return <Loading />
  }

  /* ================================GETS LIST OF GENRE======================================= */
  /* ================================GETS LIST OF LANGUAGES======================================= */

  const getLanguages = async () => {
    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/movies/distinct/languages`)
    .then(result => {
      const results = result.data.data
      console.log(results)
      setLanguageList(results);
    })
    .catch(err => console.log(err));
  }
 
  /* ================================SUBMITS FILTER======================================= */


  const addFilter = (e) => {
    console.log(year)
    console.log(typeof year)
    console.log(language)
    console.log(typeof language)
    e.preventDefault()
  }
  
  return (
    <div className="movie-container">
      <MovieHero movies={movies} />
      <button onClick={() => setModal(true)}>Click Here</button>
      <AdvanceFilter 
        isVisible={isModal}
        onClose={() => setModal(false)}
        addFilter={addFilter}
        setYear={setYear}
        year={year}
        languageList={languageList}
        language={language}
        setLanguage={setLanguage}
      />
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