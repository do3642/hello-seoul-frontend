import '../styles/MapHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faTemperatureHalf, faShuffle } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from 'react';
import Location from './Location';
import Translation from './Translation';

function MapHeader({ onToggleLocation, onButtonClick  }) {
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
        >
          <FontAwesomeIcon icon={faLocationDot} className='map-header-icon'/> &nbsp;관광지
        </button>

        <button 
          className={activeButton === '날씨' ? "active" : ""}
          onClick={() => handleClick("날씨")}
        >
          <FontAwesomeIcon icon={faTemperatureHalf} className='map-header-icon'/> &nbsp;날씨
        </button>

        <button 
          className={activeButton === '랜덤' ? "active" : ""}
          onClick={() => handleClick("랜덤")}
        >
          <FontAwesomeIcon icon={faShuffle} className='map-header-icon'/> &nbsp;랜덤
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
            >
              <FontAwesomeIcon icon={faLocationDot} className='map-header-icon'/> &nbsp;관광지
            </button>

            <button 
              className={activeButton === '날씨' ? "active" : ""}
              onClick={() => handleClick("날씨")}
            >
              <FontAwesomeIcon icon={faTemperatureHalf} className='map-header-icon'/> &nbsp;날씨
            </button>

            <button 
              className={activeButton === '랜덤' ? "active" : ""}
              onClick={() => handleClick("랜덤")}
            >
              <FontAwesomeIcon icon={faShuffle} className='map-header-icon'/> &nbsp;랜덤
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