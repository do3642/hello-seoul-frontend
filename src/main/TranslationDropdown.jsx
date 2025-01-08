import { useState, useRef, useEffect } from 'react';
import { useTranslation } from "react-i18next";
import i18n from "../locales/i18n";
import './css/TranslationDropdown.css';

const TranslationDropdown = () => {
  const { t } = useTranslation();
  const languageRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'ko', label: '한국어' },
    { code: 'en', label: 'English' },
    { code: 'ja', label: '日本語' },
    { code: 'zh', label: '中文' }
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(() => {
    const initialLang = i18n.language;
    return languages.find(lang => lang.code === initialLang)?.label || t('한국어');
  });


  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const selectLanguage = (languageCode, languageLabel) => {
    i18n.changeLanguage(languageCode);
    setSelectedLanguage(languageLabel);
    setIsOpen(false);
  };

  useEffect(() => {
    const currentLang = i18n.language;
    const currentLabel = languages.find(lang => lang.code === currentLang)?.label || t('한국어');
    setSelectedLanguage(currentLabel);
  }, [i18n.language]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && languageRef.current && !languageRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="translation-dropdown" ref={languageRef}>
      <button className="dropdown-button" onClick={toggleDropdown}>
        {selectedLanguage} <i className={`fa-solid ${isOpen ? 'fa-chevron-up' : 'fa-chevron-down'}`}></i>
      </button>
      {isOpen && (
        <ul className="dropdown-menu">
          {languages.map((lang) => (
            <li key={lang.code} onClick={() => selectLanguage(lang.code, lang.label)}>
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TranslationDropdown;
