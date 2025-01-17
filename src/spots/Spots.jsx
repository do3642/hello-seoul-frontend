import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import './css/Spots.css';
import './css/Card.css';
import './css/SpotsSeason.css';
import './css/ImgCard.css';
import './css/SpotsDetail.css';
import './css/media-Spots.css';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Translation from '../map/components/Translation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Weather from '/src/main/Weather';


function Spots() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState('');


  const buttonLabels = [
    'spots.btn-label.all', 
    'spots.btn-label.season', 
    'spots.btn-label.healing', 
    'spots.btn-label.walk', 
    'spots.btn-label.hiking', 
    'spots.btn-label.traditional'
  ];
  const buttonNav = [
    '/spots', 
    '/spots/season', 
    '/spots/healing', 
    '/spots/walk', 
    '/spots/hiking', 
    '/spots/traditional'
  ]
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoWidth, setIsAutoWidth] = useState(false);

    useEffect(() => {
      const languageCode = i18n.language; 
      setIsAutoWidth(languageCode === 'en' || languageCode === 'ja');
    }, [i18n.language]);



  // 경로 이동 함수
  const handleNavigation = (path) => {
    navigate(path);
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = (index) => {
    setActiveIndex(index);
  };

  // 검색어 입력 시 경로 이동
  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/spots/search?search=${searchTerm}`);  // 검색어를 쿼리로 전달
    }
  };



  return (
    <div className='spots'>

      <header>
        <h1 onClick={() => handleNavigation('/')}>{t('logo')}</h1>
        <div className="search-box">
          <input 
            type="search"
            name="search" 
            id="spots-search" 
            placeholder={t('spots.search')}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}  // 엔터키로 검색

           />
          <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon' onClick={handleSearch}/>
        </div>
        <ul>
          <li><button onClick={() => handleNavigation('/')}>{t('logo')}</button></li>
          <li><button onClick={() => handleNavigation('/map')}>{t('nav.0.navMap')}</button></li>
          <li><button onClick={() => handleNavigation('/subway')}>{t('nav.0.subway')}</button></li>
          <li><Weather /></li>
          <li><Translation/></li>
        </ul>
      </header>

      <section className='spots-container'>

        <div className={`spots-menu-box ${isAutoWidth ? 'auto-width' : ''}`}>
          {buttonLabels.map((label, index) => (
            <button
              key={index}
              className={index === activeIndex ? 'active' : ''}
              onClick={() => {
                handleButtonClick(index);
                handleNavigation(buttonNav[index]);
              }}
            >
              {t(label)}
            </button>
          ))}
        </div>

        <article className='spots-content'>
          {/* <SpotsMain handleMoreClick={handleMoreClick}  setIsAutoWidth={setIsAutoWidth}/> */}
          <Outlet context={{ handleNavigation,setActiveIndex }}/> 
        </article>
      </section>

      <div className="mobile-menu">
          <ul className="">
            <li className="nav-item home" onClick={() => handleNavigation('/')}>
              <i className="fas fa-home"></i> {/* 홈 아이콘 */}
              <span className="nav-text">{t('logo')}</span>
            </li>
            <li className="nav-item map" onClick={() => handleNavigation('/map')}>
              <i className="fas fa-map"></i> {/* 지도 아이콘 */}
              <span className="nav-text">{t('nav.0.navMap')}</span>
            </li>
            <li className="nav-item subway" onClick={() => handleNavigation('/subway')}>
              <i className="fas fa-subway"></i> {/* 별 아이콘 */}
              <span className="nav-text">{t('nav.0.subway')}</span>
            </li>
           </ul>
        </div>


        <footer className="footer">
          <div className="footer-container">
            <p>© 2025 안녕, 서울</p>
            <p>서울의 매력을 한눈에, 당신의 여행을 더 특별하게.</p>
            <small className="footer-developers">Developed by: 이영찬, 최하영, 권민수</small>
          </div>
        </footer>


    </div>
  );
}

export default Spots;
