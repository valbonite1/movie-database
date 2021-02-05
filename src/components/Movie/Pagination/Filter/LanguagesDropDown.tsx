import React from 'react'
import './DropDown.css'

const LanguageDropDown = ({ language, setLanguage, languageList }) => {
  return (
    <>
      <div className="custom-select">
        <label className='drop-label' ><span className="sr-only">Select a word:</span>
          <select name="words" id="id-1" value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value='false'>-- choose language--</option>
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
