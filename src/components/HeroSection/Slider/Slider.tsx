import React from 'react';
import './Slider.css';

const Slider = () => {

  let arr = [1, 2, 3, 4, 5]
  return (
    <>
    <div id="slideshow">
      <div className="slide-wrapper">
        {arr.map((slide) => {
          return (
            <div className="slide"><h1 className="slide-number">{slide}</h1></div>
          )
        })}
      </div>
    </div>
    </>
  )
}

export default Slider
