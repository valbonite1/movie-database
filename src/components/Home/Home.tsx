import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import LandingPage from '../HeroSection/LandingPage';
import Chart from '../Analytics/Chart';


const Home: React.FC = () => {

  const { isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated && (
        <>
          <LandingPage />
          <Chart />
        </>
    )}
  </>
  )
}

export default Home;
