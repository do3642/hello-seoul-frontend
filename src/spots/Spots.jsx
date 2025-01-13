import { useNavigate } from 'react-router-dom';
import './css/Spots.css';
import Card from './Card';  
import './css/media-Spots.css';
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Translation from '../map/components/Translation';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import data from '/src/data/2025서울시 문화행사 정보.json';



function Spots() {
  const { t, i18n } = useTranslation();
  const buttonLabels = ['전체', '계절별', '힐링', '산책', '등산', '전통'];
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  
  // 관광지와 축제 데이터 상태 관리
  const [touristSpots, setTouristSpots] = useState([]);
  const [festivals, setFestivals] = useState([]);

  // 언어 코드 변환 함수
  const getLanguageCode = (lang) => {
    const languageMap = {
      ko: 'kor',
      en: 'eng',
      ja: 'jpn',
      zh: 'chs'
    };
    return languageMap[lang] || 'kor'; // 기본값은 'kor'로 설정
  };


  // API 호출하여 데이터 가져오기
  useEffect(() => {
    const languageCode = i18n.language; 
    const replaceLang = getLanguageCode(languageCode)
    // 관광지 데이터 요청
    axios.get(`http://localhost:8888/api/tourist-spots?lang=${replaceLang}`)
      .then(response => setTouristSpots(response.data))
      .catch(error => console.error('Error fetching tourist spots:', error));

    // 축제 데이터 요청
    const sortedFestivals = data.DATA
      .sort((a, b) => b.end_date - a.end_date) // 최신 축제부터 정렬
      .slice(0, 4); // 최신 4개만 가져옴
    setFestivals(sortedFestivals);

  }, [i18n.language]);

  // 경로 이동 함수
  const handleNavigation = (path) => {
    navigate(path);
  };

  // 버튼 클릭 핸들러
  const handleButtonClick = (index) => {
    setActiveIndex(index);
    console.log(touristSpots);

  };

  return (
    <div className='spots'>
      <header>
        <h1>{t('logo')}</h1>
        <div className="search-box">
          <input type="search" name="search" id="spots-search" />
          <FontAwesomeIcon icon={faMagnifyingGlass} className='search-icon'/>
        </div>
        <ul>
          <li><button onClick={() => handleNavigation('/')}>홈</button></li>
          <li><button onClick={() => handleNavigation('/map')}>지도</button></li>
          <li><button onClick={() => handleNavigation('/subway')}>지하철</button></li>
          <li>★ 서울 -3 /-5 도</li>
          <li><Translation/></li>
        </ul>
      </header>

      <section className='spots-container'>
        <div className="spots-menu-box">
          {buttonLabels.map((label, index) => (
            <button
              key={index}
              className={index === activeIndex ? 'active' : ''}
              onClick={() => handleButtonClick(index)}
            >
              {label}
            </button>
          ))}
        </div>

        <article className='spots-content'>
          <div className="spots-content-top">
            <h2>전체 관광지</h2>
            <button>
              <i className="fas fa-plus"> </i>
              더보기
            </button>
          </div>
          <div className="spots-content-cards">
            {touristSpots.map((spot, index) => (
              <Card key={index} type="tourist" {...spot} />
            ))}
          </div>

          <div className="spots-content-top">
            <h2>전체 축제</h2>
            <button>
              <i className="fas fa-plus"> </i>
              더보기
            </button>
          </div>
          <div className="spots-content-cards">
            {festivals.map((festival, index) => (
              <Card key={index} type="festival" {...festival} />
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default Spots;
