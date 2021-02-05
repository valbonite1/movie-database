import React from 'react'
import { Link } from 'react-router-dom';
import './MovieItem.css'

const MovieItem = ({ movies }) => {
  return (
    
    <ul className="movie-list-container">
      {movies.map((movie, index) => {
        return (
        <li key={index} className="movie-card">
          <Link to={`${window.location.pathname}${movie.title}`}>
            <div className='movie-poster'>
              {movie.poster !== undefined  ? 
                <img src={movie.poster} alt={movie.title} className='movie-img' /> :
                <div className='default-poster'><h3>MFLIX</h3></div>
              }
            </div>
            <div className='movie-text'>
              {movie.title}
            </div>
          </Link>
        </li>
        )
      })}
    </ul>
  )
}

export default MovieItem;