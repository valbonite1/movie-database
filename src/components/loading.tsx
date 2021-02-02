import React from "react";
import './loading.css';
/* const loadingImg =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg"; */

const Loading = () => (
  <div className='loading-container'>
    <div className="spinner">
      <img src='/images/meta-none.png' alt="Loading..." className='loading'/>
    </div>
  </div>
);

export default Loading;