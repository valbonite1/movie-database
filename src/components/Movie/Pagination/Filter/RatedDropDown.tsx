import React from 'react'
import './DropDown.css'

const RatedDropDown = ({ setRated, ratedList, rated }) => {
  return (
    <>
      <div className="custom-select">
        <label className='drop-label' ><span className="sr-only">Select a word:</span>
          <select name="words" id="id-2" onChange={(e) => setRated(e.target.value)}>
            <option value='default' className='option-ph'>classification</option>
            {ratedList.map((rate) => {
              return(
                <option value={rate}>{rate}</option>
              )
            })}
          </select>
        </label>
      </div>
    </>
  )
}

export default RatedDropDown;
