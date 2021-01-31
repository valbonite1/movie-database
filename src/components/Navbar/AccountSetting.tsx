import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import Logout from './Logout';
import './AccountSetting.css';

const AccountSetting = () => {

  const { user } = useAuth0();
  return (
    <>
      <div className='setting-container'>
        <div className="dropdown" style={{float: 'right'}}>
          <button className="dropbtn"><img src={user.picture} alt={user.name} className='acc-pic' /></button>
          <div className="dropdown-content">
              <a href="#" className='drop-item'>Account</a>
              <a href="#" className='drop-item'><Logout /></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountSetting;
