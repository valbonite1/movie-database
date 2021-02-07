import React from 'react'
import YearDropDown from './YearDropDown';
import LanguageDropDown from './LanguageDropDown';
import GenreDropDown from './GenreDropDown';
import RatedDropDown from './RatedDropDown';
import './DropDown.css'
import RatingSlider from './RatingSlider';

const Filter = ({
  setYear,
  year,
  setLanguage,
  languageList,
  setGenre,
  genreList,
  setRated,
  ratedList,
  clearFilter,
  language,
  genre,
  rated,
  value,
  handleRatingChange
}) => {
  return (
    <>
      <div className ='filter-container'>
        <div className='dd-container'>
          <YearDropDown setYear={setYear} year={year} />
          <LanguageDropDown setLanguage={setLanguage} languageList={languageList} language={language} />
          <GenreDropDown setGenre={setGenre} genreList={genreList} genre={genre} />
          <RatedDropDown setRated={setRated} ratedList={ratedList} rated={rated} />
          <RatingSlider value={value} handleRatingChange={handleRatingChange} />
          <button className='filter-btn' type='submit' onClick={clearFilter}>Clear Filter</button>
        </div>
      </div>
    </>
  )
}

export default Filter
