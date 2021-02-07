import React from 'react'
import { Link } from 'react-router-dom';
import './SearchItem.css'

const SearchItem = ({ movies }) => {
  return (
    
    <ul className="movie-list-container">
      {movies.map((movie, index) => {
        return (
        <li key={movie._id} className="movie-card">
          <Link to={`/movies/${movie._id}/${movie.title}`}>
            <div className='movie-poster'>
              {movie.poster !== undefined  ? 
                <img src={movie.poster} alt={movie.title} className='movie-img' /> :
                <div className='default-poster'><h3>MFLIX</h3></div>
              }
            </div>
            <div className='movie-text'>
              <h5>{movie.title} ({movie.year})</h5>
              <ul className='movie-direct-list'>
                <li>Directed by:</li>
                {movie.directors.map((director) => {
                  return (
                  <li key={index}>{director}</li>
                  )
                })}
              </ul>
              <ul className='movie-genre-list'>
              {movie.genres.map((genre) => {
                return(
                  <li key={index}>{genre}</li>
                )
              })}
              </ul>
            </div>
          </Link>
        </li>
        )
      })}
    </ul>
  )
}

export default SearchItem;