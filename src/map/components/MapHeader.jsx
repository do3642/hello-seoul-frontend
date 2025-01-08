import '../styles/MapHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTemperatureHalf, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import Location from './Location';
import Translation from './Translation';
import { useTranslation } from 'react-i18next';

function MapHeader({ onToggleLocation, onButtonClick  }) {
  const { t, i18n  } = useTranslation();

  const [activeButton, setActiveButton] = useState("관광지");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // 윈도우 크기 변경 시 상태 업데이트
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize); // 컴포넌트 언마운트 시 이벤트 제거
    };
  }, []);

  // 폰트 크기 조건 설정
  const buttonStyle = {
    fontSize: (i18n.language === "en" && windowWidth <= 500) ? "10px" : // 영어일 경우 500px 이하에서만 10px
               (i18n.language === "ko" && windowWidth <= 500) ? "14px" : // 한국어일 경우 500px 이하에서만 14px
               (windowWidth <= 500) ? "12px" :  // 그 외 언어 및 500px 이하일 때는 12px
               (i18n.language === "en") ? "12px" :  // 영어일 경우 기본 폰트 크기 12px
               "16px"  // 나머지 언어의 기본 폰트 크기 16px
  };
  
  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
    onButtonClick(buttonName);
  };

  return(
    <>
     {windowWidth > 500 ? (
    <div className="map-header-container">
      <div className='map-header'>
        <button 
          className={activeButton === '관광지' ? "active" : ""}
          onClick={() => handleClick("관광지")}
          style={buttonStyle}
        >
          <FontAwesomeIcon icon={faLocationDot} className='map-header-icon'/> &nbsp;{t('map-page.touristAttraction')}
        </button>

        <button 
          className={activeButton === '날씨' ? "active" : ""}
          onClick={() => handleClick("날씨")}
          style={buttonStyle}
        >
          <FontAwesomeIcon icon={faTemperatureHalf} className='map-header-icon'/> &nbsp;{t('map-page.weather')}
        </button>

        <button 
          className={activeButton === '랜덤' ? "active" : ""}
          onClick={() => handleClick("랜덤")}
          style={buttonStyle}
        >
          <FontAwesomeIcon icon={faShuffle} className='map-header-icon'/> &nbsp;{t('map-page.random')}
        </button>
      </div>

      <div className='map-header-right'>
        <Location onToggleLocation={onToggleLocation}/>
        <Translation />
      </div>
    </div>
    ) : (
       <>
        <div className="map-header-container">
          <div className='map-header'>
            <button 
              className={activeButton === '관광지' ? "active" : ""}
              onClick={() => handleClick("관광지")}
              style={buttonStyle}
            >
              <FontAwesomeIcon icon={faLocationDot} className='map-header-icon'/> &nbsp;{t('map-page.touristAttraction')}
            </button>

            <button 
              className={activeButton === '날씨' ? "active" : ""}
              onClick={() => handleClick("날씨")}
              style={buttonStyle}
            >
              <FontAwesomeIcon icon={faTemperatureHalf} className='map-header-icon'/> &nbsp;{t('map-page.weather')}
            </button>

            <button 
              className={activeButton === '랜덤' ? "active" : ""}
              onClick={() => handleClick("랜덤")}
              style={buttonStyle}
            >
              <FontAwesomeIcon icon={faShuffle} className='map-header-icon'/> &nbsp;{t('map-page.random')}
            </button>
          </div>
        </div>
        <div className='map-header-right'>
          <Location onToggleLocation={onToggleLocation}/>
          <Translation />
        </div>
       </>
      )}
    </>
  )
}

export default MapHeader;