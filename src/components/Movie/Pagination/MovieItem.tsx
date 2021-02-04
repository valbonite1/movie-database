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
              <img src={movie.poster} alt={movie.title} className='movie-img' />
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