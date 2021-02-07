import React from 'react'
import './MovieDetail.css';

const MovieDetailProps = ({
  imdb,
  awards,
  tomatoes,
  directors,
  countries,
  genres,
  cast,
  language,
  writers,
  details,
  handleBack
}) => {


  return (
    <>
      <div className='movie-detail-container'>
        <div className='detail-hero'>
          <img className='detail-hero-img' src={details.poster} alt={details.title} />
          
        </div>
        <div className='detail-overlay'>
        </div>
        <button onClick={handleBack} className='back-btn'><i className="fas     fa-chevron-left"></i>BACK</button>
        <div className='detail-hero-contents'>
          <div className='detail-img'>
            <div className='detail-poster'>
              {details.poster !== undefined ? 
                <img src={details.poster} alt={details.title} className='poster-img' /> :
                <div className='default-poster-detail'><h3>MFLIX</h3></div>
              }
            </div>
          </div>
          <div className='detail-text'>
            <h1>{details.title} ({details.year})</h1>
            <ul className='detail-genre'>
              <li className='rated'>{details.rated}</li>
              {genres.map((genre, index) => {
                return (
                  <li key={index}>{genre}</li>
                )
              })}
            </ul>
            <div className='movie-deets'>
              <div className='rating'>
                <div className='imdb-header'>
                  <p className='imdb'>IMDb:</p>
                </div>
                <div className='imdb-body'>
                  <h1 className='imdb-rating'>{imdb.rating}</h1>
                </div>
              </div>
              <div className='deets-text'>
                <h3 className='overview'>Overview</h3>
                <p className='full-plot'>{details.fullplot}</p>
              </div> 
            </div>
            
            <ul className='detail-director'>
              <li>Directed by:</li>
              {directors.map((director, index) => {
                return (
                  <li key={index}>{director}</li>
                )
              })}
            </ul>   
          </div>
        </div>        
      </div>
    </>
  )
}

export default MovieDetailProps;
