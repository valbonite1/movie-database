import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import Navbar from '../Navbar/Navbar';
import HeroSection from '../HeroSection/HeroSection';


const Home: React.FC = () => {

  const { logout, isAuthenticated } = useAuth0();
  return (
    <>
      {isAuthenticated && (
        <>
          <HeroSection /> 
        </>
    )}
  </>
  )
}

export default Home;
