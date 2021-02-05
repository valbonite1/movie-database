import React from 'react'
import YearDropDown from './YearDropDown';
import LanguageDropDown from './LanguageDropDown';
import GenreDropDown from './GenreDropDown';
import RatedDropDown from './RatedDropDown';
import './DropDown.css'

const Filter = ({
  setYear,
  year,
  setLanguage,
  languageList,
  setGenre,
  genreList,
  setRated,
  ratedList,
  clearFilter
}) => {
  return (
    <>
      <div className ='filter-container'>
        <div className='dd-container'>
          <YearDropDown setYear={setYear} year={year} />
          <LanguageDropDown setLanguage={setLanguage} languageList={languageList} />
          <GenreDropDown setGenre={setGenre} genreList={genreList}/>
          <RatedDropDown setRated={setRated} ratedList={ratedList} />
          <button className='filter-btn' type='submit' onClick={clearFilter}>Clear Filter</button>
        </div>
      </div>
    </>
  )
}

export default Filter
