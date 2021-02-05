import React from 'react'
import './DropDown.css'

const GenreDropDown = ({ setGenre, genreList }) => {
  return (
    <>
      <div className="custom-select">
        <label className='drop-label' >
          <select name="words" id="id-2" onChange={(e) => setGenre(e.target.value)}>
            <option value='' className='option-ph'>genre</option>
            {genreList.map((genre) => {
              return(
                <option value={genre}>{genre}</option>
              )
            })}
          </select>
        </label>
      </div>
    </>
  )
}

export default GenreDropDown;
