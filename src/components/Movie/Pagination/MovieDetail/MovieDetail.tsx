import React, { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom';
import MovieTabs from './MovieTabs';
import axios from 'axios';
import { setOriginalNode } from 'typescript';
import { data } from '../../../HeroSection/HeroSectionData';
import MovieDetailProps from './MovieDetailProps';
import Loading from '../../../loading';

const MovieDetail = () => {

  const history = useHistory()
  const {_id} = useParams();
  const [awards, setAwards] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [imdb, setImdb] = useState<any>([]);
  const [tomatoes, setTomatoes] = useState<any>([]);
  const [directors, setDirectors] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [genres, setGenres] = useState<any>([]);
  const [cast, setCast] = useState<any>([]);
  const [languages, setLanguages] = useState<any>([]);
  const [writers, setWriters] = useState<any>([]);
  const [details, setDetails] = useState<any>([])


  const fetchMovie = async () => {

    setLoading(true);

    await axios
    .get(`${process.env.REACT_APP_BASE_URL}/movies/${_id}`, {

    })
    .then(result => {
      const {
        awards,
        imdb,
        tomatoes,
        directors,
        countries,
        genres,
        cast,
        languages,
        writers,
        ...data
      } = result.data.data
      console.log(awards);
      setImdb(imdb);
      setAwards(awards);
      setTomatoes(tomatoes);
      setDirectors(directors);
      setCountries(countries);
      setGenres(genres);
      setCast(cast);
      setLanguages(languages);
      setWriters(writers);
      setDetails(data);
      setLoading(false);
    })
    .catch(err => console.log(err));
  }

  useEffect(() => {
    fetchMovie()
  }, [])

  const handleBack = () => {
    history.goBack()
  }

  return (
    <>
    { loading ? <Loading /> :
      <>
        <MovieDetailProps 
          handleBack={handleBack}
          imdb={imdb}
          awards={awards}
          tomatoes={tomatoes}
          directors={directors}
          countries={countries}
          genres={genres}
          cast={cast}
          language={languages}
          writers={writers}
          details={details}
        />
        <MovieTabs />
      </>
    }
    </>
  )
}

export default MovieDetail;
