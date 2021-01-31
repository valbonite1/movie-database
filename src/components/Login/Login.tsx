import React from 'react';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';

const Login: React.FC = () => {

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return(
    <>
      {!isAuthenticated && (
        <div className='login-wrapper'>
          <div className='login-container'>
            <div className='login-header'>
              <h1>Sign In</h1>
            </div>
            <form className='form-container'>
              <div className='input-container'>
                <input type='email' required placeholder='Email Adress' />
              </div>
              <div className='input-container'>
                <input type='password' required placeholder='Password' />
                <p className='sign-up-text'>Don't have an account yet? Sign up <span className='sign-up-here'><a href='#'>here</a></span>.</p>
              </div>
              <div className='btn-login-container'>
                <button className='btn-login'>Sign In</button>
              </div>
            </form>
            <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })} className='btn-google'>Sign In With Google</button>
          </div>
        </div>
        )
      }
    </>
  )
}

export default Login;