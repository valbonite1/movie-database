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
            <div className='drop-item'>
              <img src={user.picture} alt={user.name} className='drp-pic' />
              <p className='user-header'>{user.name}</p>
              <p className='user-email'>{user.email}</p>
            </div>
            <a href="#" >View Profile</a>
            <a href="#" ><Logout /></a>
          </div>
        </div>
      </div>
    </>
  )
}

export default AccountSetting;
