import React from 'react'
import './DropDown.css'

const YearDropDown = ({ year, setYear }) => {
  return (
    <>
      <div className="custom-select">
        <label className='drop-label' ><span className="sr-only">Select a word:</span>
          <select name="words" id="id-1" onChange={(e) => setYear(e.target.value)}>
            <option value='' disabled selected className='option-ph'>year</option>
            <option value="false">Newest to Oldest</option>
            <option value="true">Oldest to Newest</option>
          </select>
        </label>
      </div>
    </>
  )
}

export default YearDropDown;
