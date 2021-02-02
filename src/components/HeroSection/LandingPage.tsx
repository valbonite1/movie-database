import React from 'react'
import HeroSection from './HeroSection'
import { data } from './HeroSectionData';

const createDetails = (movie) => {
  return (
  <HeroSection 
    key={movie.id}
    title={movie.title}
    genre={movie.genre}
    details={movie.details}
    />
  )
}

const LandingPage = () => {
  return (
    <>
      {data.map(createDetails)}
    </>
  )
}

export default LandingPage
