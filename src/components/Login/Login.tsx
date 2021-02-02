import React from 'react';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';

const Login: React.FC = () => {

  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return(
    <>
      {!isAuthenticated && (
        <div className='login-wrapper'>
          <div className='login-text'>
            <p>IMDb is the world's most popular and authoritative source for movie, TV and celebrity content, designed to help fans explore the world of movies and shows and decide what to watch.</p>
          </div>
          <div className='login-container'>
            <div className='login-form'>
              <div className='login-header'>
                <h1>Sign In</h1>
              </div>
              <form className='form-container'>
                <div className='input-container'>
                  <input type='email'  placeholder='Email Adress' />
                </div>
                <div className='input-container'>
                  <input type='password'  placeholder='Password' />
                  <p className='sign-up-text'>Don't have an account yet? Sign up <span className='sign-up-here'><a href='#'>here</a></span>.</p>
                </div>
                <div className='btn-login-container'>
                  <button className='btn-login'>Sign In</button>
                  <button onClick={() => loginWithRedirect({ screen_hint: 'signup' })} className='btn-google'>Sign In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        )
      }
    </>
  )
}

export default Login;