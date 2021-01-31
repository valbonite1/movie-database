import React, { useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import './Logout.css';

const Logout: React.FC = () => {
  const { logout, isAuthenticated } = useAuth0();

  return (
    <>
      {isAuthenticated && (
        <button className='btn-logout' onClick={() => logout()}>Sign out</button>
    )}  
    </>
  )
}

export default Logout;
