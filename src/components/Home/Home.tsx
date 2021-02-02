import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Genre from '../Movie/Genre/Genre';
import LandingPage from '../HeroSection/LandingPage';
import Chart from '../Analytics/Chart';



const Home: React.FC = () => {

  const { logout, isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated && (
        <>
          <LandingPage />
          <Genre />
          <Chart />
        </>
    )}
  </>
  )
}

export default Home;
