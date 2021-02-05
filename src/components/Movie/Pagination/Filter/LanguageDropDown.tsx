import React from 'react'
import './DropDown.css'

const LanguageDropDown = ({ setLanguage, languageList }) => {
  return (
    <>
      <div className="custom-select">
        <label className='drop-label' ><span className="sr-only">Select a word:</span>
          <select name="words" id="id-2" onChange={(e) => setLanguage(e.target.value)}>
            <option value='' className='option-ph'>language</option>
            {languageList.map((language) => {
              return(
                <option value={language}>{language}</option>
              )
            })}
          </select>
        </label>
      </div>
    </>
  )
}

export default LanguageDropDown;
