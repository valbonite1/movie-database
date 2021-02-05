import React from 'react';
import './AdvanceFilter.css';
import LanguageDropDown from './LanguagesDropDown';
import YearDropDown from './YearDropDown';

const AdvanceFilter = ({ 
  isVisible = false, 
  onClose, 
  addFilter, 
  setYear, 
  year, 
  languageList,
  language,
  setLanguage
 }) => {
  const keydownHandler = ({ key }) => {
    switch (key) {
      case 'Escape':
        onClose();
        break;
      default:
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => document.removeEventListener('keydown', keydownHandler);
  });

 

  return !isVisible ? null : (
    <div className="modal" onClick={onClose}>
      <div className="modal-dialog" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h1>Advanced Filter</h1>
        </div>
        <div className="modal-body">
          <div className="modal-content">
            <form className='filter-checkbox'>
              <YearDropDown setYear={setYear} year={year} />
              <LanguageDropDown setLanguage={setLanguage} language={language} languageList={languageList} />
              <button type='submit' onClick={addFilter}>Filter</button>
            </form>
          </div>
        </div>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
};

export default AdvanceFilter;