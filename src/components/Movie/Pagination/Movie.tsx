import React, { useState, useEffect, useLayoutEffect } from 'react';
import Pagination from './Pagination'
import axios from 'axios'
import MovieItem from './MovieItem';
import Loading from '../../loading';
import './Movie.css';
import MovieHero from './MovieHero'
import Filter from './Filter/Filter';
import NoResultFound from './Filter/NoResultFound';

const MovieChild: React.FC= () => {

  const [movies, setMovies] = useState<Array<object>>([])
  const [loading, setLoading] = useState<boolean>(false) 
  const [currentButton, setCurrentButton] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1)
  const [genre, setGenre] = useState<string>('default');  
  const [year, setYear] = useState<string>('false');
  const [language, setLanguage] = useState<string>('default');
  const [type, setType] = useState<string>('default');
  const [rated, setRated] = useState<string>('default');
  const [languageList, setLanguageList] = useState<Array<string>>([])
  const [genreList, setGenreList] = useState<Array<string>>([])
  const [ratedList, setRatedList] = useState<Array<string>>([])
 

  /* ==============================GETS DATA OF CURRENT PAGE========================================= */

  const fetchPosts = async () => {
    await axios
    .get(`${process.env.REACT_APP_BASE_URL}${window.location.pathname}/filter?filterBy=year&asc=${year}&genre=${genre}&language=${language}&type=${type}&rated=${rated}`)
    .then(result => {
      const results = result.data.data.movies;
      setMovies(results)
      if (result.data.data.totalNumberOfPages > 999) {
        setTotalPages(999)
      } else {
        setTotalPages(result.data.data.totalNumberOfPages);
      }
      console.log(result.data.data.totalNumberOfPages)
      const curNum = `${window.location.pathname}`;
      setCurrentButton(parseInt(curNum.slice(13)));
    })
    .catch(err => console.log(err));
  }
  
  useEffect(() => {
    setLoading(true);
    fetchPosts();
    changePagination();
    getLanguages();
    getGenres();
    getRated();
    setLoading(false);
  }, [totalPages]);

  
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


  /* ==============================GETS CURRENT POST========================================= */

  const fetchCurrentPagePost = async (currentButton) => {
    setLoading(true);
    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/movies/page/${currentButton}/filter?filterBy=year&asc=${year}&genre=${genre}&language=${language}&type=${type}&rated=${rated}`)
    .then(result => {
      const results = result.data.data.movies;
      console.log(results);
      setMovies(results)
      console.log(movies, 'HELLOOO')
      setLoading(false);
    })

    .catch(err => console.log(err));
  }

    /* ==============================USEEFFECT FOR CHANGES IN PAGE========================================= */
    
  useEffect(() => {
    fetchCurrentPagePost(currentButton);
    changePagination();
  }, [currentButton])


  /* ================================GETS LIST OF GENRE======================================= */

  const getGenres = async () => {
    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/movies/distinct/genres`)
    .then(result => {
      const results = result.data.data
      console.log(results)
      setGenreList(results);
    })
    .catch(err => console.log(err));
  }
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

    /* ================================GETS LIST OF MOVIE CATEGORY RATING======================================= */

    const getRated = async () => {
      await axios
      .get(`${process.env.REACT_APP_BASE_URL}/movies/distinct/rated`)
      .then(result => {
        const results = result.data.data
        console.log(results)
        setRatedList(results);
      })
      .catch(err => console.log(err));
    }
 
  /* ================================SUBMITS FILTER======================================= */


  const addFilter = async (year, genre, language, rated) => {
    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/movies/page/${currentButton}/filter?filterBy=year&asc=${year}&genre=${genre}&language=${language}&type=${type}&rated=${rated}`)
    .then(result => {
      const results = result.data.data.movies;
      console.log(results);
      if (results === undefined) {
        console.log("no matches found")
      }
      setMovies(results)
      setLoading(false);
      if (result.data.data.totalNumberOfPages > 999) {
        setTotalPages(999)
      } else {
        setTotalPages(result.data.data.totalNumberOfPages);
      }
    })
    .catch(err => console.log(err));
  }

  /* ================================FILTER USEEFFECT======================================= */

  useEffect(()=> {
    addFilter(year,genre,language,rated)
  }, [year, genre, language, rated])
  
  /* ================================CONDITIONALLY RENDERS FILTER RESULTS======================================= */

  const clearFilter = () => {
    setYear('false');
    setLanguage('default')
    setGenre('default')
    setRated('default')
    setCurrentButton(1);
  }
  
  const movieResults = () => {

    if (movies === undefined) {
      return <NoResultFound />
    } else {
      return (
        <>
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
        </>
      )
      
    }
  }
  
  return (
    <>
    <div className="movie-container">
      <MovieHero movies={movies} />
      <Filter 
        setYear={setYear}
        year={year}//
        languageList={languageList}
        setLanguage={setLanguage}//
        setGenre={setGenre}
        genreList={genreList}//
        ratedList={ratedList}
        setRated={setRated}//
        clearFilter={clearFilter}
      />
      { loading && movies.length === 0 ? <Loading /> : <div className='movie-result'>{movieResults()}</div>}
      </div>
    </>
  );
}

export default MovieChild;

