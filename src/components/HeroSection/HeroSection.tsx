import React from 'react';
import './HeroSection.css';

type Props = {
  id?: number,
  title: string,
  genre: Array<string>,
  details: Array<string>
}

const HeroSection: React.FC<Props> = ({ title, details, genre }) => {
  return (
    <>
      <div className='hero-container'>
        <div className='hero-overlay'>
          <div className='hero-overlay-two'>
            <div className='hero-text'>
              <ul className='details'>
                {details.map((detail) => {
                  return(
                    <li key={details.indexOf(detail)}>{detail}</li>
                  )
                })}
              </ul>
              <h1>{title}</h1>
              <p className='subheader'>A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.</p>
              <ul className='genre-list'>
                {genre.map((type) => {
                  return(
                    <li key={genre.indexOf(type)}>{type}</li>
                  )
                })}
              </ul>
              <button type='submit' className='read-more'>Read More</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HeroSection;

