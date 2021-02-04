import React from 'react'
import './MovieHero.css';

const MovieHero = ({ movies }) => {
  return (
    <>
      <div className='movie-hero'>
          <div className='img-left'>
            <img src='/images/john-wick.jpeg' alt='john-wick' className='hero-img' />
          </div>
          <div className='img-right'>
            <img src='/images/martian.jpg' alt='john-wick' className='hero-img' />
          </div>
      </div>
      <div className='movie-overlay'>
      </div>
    </>
  )
}

export default MovieHero;
