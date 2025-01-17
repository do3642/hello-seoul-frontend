import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Card from './Card';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';
import getLanguageCode from '../utils/getLanguageCode';
  // 언어 코드 변환 함수



function SpotsMain() {
  const { handleNavigation } = useOutletContext();
  const { t, i18n } = useTranslation();
  const [touristSpots, setTouristSpots] = useState([]);
  const [festivals, setFestivals] = useState([]);
  const [excludeIds, setExcludeIds] = useState([]); 


    // API 호출하여 데이터 가져오기
    useEffect(() => {
      const languageCode = i18n.language; 
      const replaceLang = getLanguageCode(languageCode)
      // 관광지 데이터 요청


      axios.get(`http://localhost:8888/api/tourist-spots`, {
      params: {
        lang: replaceLang,
        page: 0,
        size: 4,
        excludeIds: excludeIds.join(',')
      }
      })
        .then(response => setTouristSpots(response.data))
        .catch(error => console.error('Error fetching tourist spots:', error));
  
      // 축제 데이터 요청

      axios.get(`http://localhost:8888/api/festivals`, {
        params: {
          lang: replaceLang,
          page: 0,
          size: 4,
          excludeIds: excludeIds.join(',')
        }
      })
      .then(response => setFestivals(response.data))
      .catch(error => console.error('Error fetching festivals:', error));
  
      
    }, [i18n.language]);

  return (
    <>
      <div className="spots-content-top">
        <h2>{t('spots.allSpots')}</h2>
        <button onClick={() => handleNavigation('/spots/alltourist')}>
          <i className="fas fa-plus"> </i>
          {t('spots.more')}
        </button>
      </div>
      <div className="spots-content-cards">
        {touristSpots.map((spot, index) => (
          <Card key={index} type="tourist" {...spot} />
        ))}
      </div>

      <div className="spots-content-top">
        <h2>{t('spots.allFestival')}</h2>
        <button onClick={() => handleNavigation('/spots/allfestival')}>
          <i className="fas fa-plus"> </i>
          {t('spots.more')}
        </button>
      </div>
      <div className="spots-content-cards">
        {festivals.map((festival, index) => (
          <Card key={index} type="festival" {...festival} />
        ))}
      </div>
    </>
  );
}

export default SpotsMain;
