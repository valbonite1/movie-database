import React from 'react'
import './DropDown.css'

const YearDropDown = ({ year, setYear }) => {
  return (
    <>
      <div className="custom-select">
        <label className='drop-label' ><span className="sr-only">Select a word:</span>
          <select name="words" id="id-1" value={year} onChange={(e) => setYear(e.target.value)}>
            <option value="" hidden>Select Year</option>
            <option value="true">Oldest to Newest</option>
            <option value="false">Newest to Oldest</option>
          </select>
        </label>
      </div>
    </>
  )
}

export default YearDropDown;
