import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import i18n from "../../locales/i18n";

function Translation() {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);  // active 상태 유지
  const [selectedLanguage, setSelectedLanguage] = useState(t('한국어'));  // 초기 언어 설정

  const languages = [
    { code: 'kor', label: '한국어' },
    { code: 'eng', label: 'English' },
    { code: 'jpn', label: '日本語' },
    { code: 'chs', label: '中文' }
  ];

  const toggleDropdown = () => {
    setIsActive(!isActive);  // 클릭 시 active 상태 토글
  };

  const selectLanguage = (languageCode, languageLabel) => {
    i18n.changeLanguage(languageCode); // 언어 변경
    setSelectedLanguage(languageLabel);
    setIsActive(false);  // 리스트 닫기
  };

  return (
    <div className={`translation ${isActive ? "active" : ""}`}>
      <FontAwesomeIcon 
        icon={faGlobe} 
        className='translation-icon' 
        onClick={toggleDropdown}  // 아이콘 클릭 시 토글
      />
      {isActive && (
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
}

export default Translation;
