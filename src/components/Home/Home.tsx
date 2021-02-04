import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Genre from '../Movie/Genre/Genre';
import LandingPage from '../HeroSection/LandingPage';
import Chart from '../Analytics/Chart';
import Slider from '../HeroSection/Slider/Slider';
import Movie from '../Movie/Pagination/Movie';


const Home: React.FC = () => {

  const { isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated && (
        <>
          <LandingPage />
          <Genre />
          <Slider />
          <Chart />
        </>
    )}
  </>
  )
}

export default Home;
