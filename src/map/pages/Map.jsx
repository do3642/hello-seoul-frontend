import { useEffect, useState } from "react";
import MapHeader from "../components/MapHeader";
import MapWebNav from "../components/MapWebNav";
import NaverMap from "../components/NaverMap";
import Sidebar from "../components/Sidebar";
import gudata from "../../data/Seoul_Gu.json"
import AllWeather from "../components/AllWeather";
import '../styles/media-map.css'

function Map() {
  const [map, setMap] = useState(null);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);    // 현재 위치 표시 여부
  const [activeButton, setActiveButton] = useState("관광지");
  const [districtName, setDistrictName] = useState('서울');


  useEffect(() => {
    // 지도 초기화
    const mapOptions = {
      center: new naver.maps.LatLng(37.566535, 126.9779692),
      zoom: 12, // 줌 레벨
    };
    const newMap = new naver.maps.Map('main-map', mapOptions);
    setMap(newMap);


    // 지도 로딩 후 로고 컨트롤 위치 변경
    naver.maps.Event.once(newMap, 'init', function () {
      const logo = document.querySelector('#main-map > div:nth-child(3)');
      if (logo) {
        logo.style.position = 'absolute';
        logo.style.left = 'auto';
        logo.style.right = '20px';
      }
    });
    return () => {
      // 컴포넌트 언마운트 시 map 객체 정리
      newMap.destroy();
    };
  }, []);


  // 내 위치 버튼이 눌렸을 때 상태 변경
  const handleToggleLocation = (isActive) => {
    setShowCurrentLocation(isActive);
  };
  // 버튼 클릭 시 상태 변경
  const handleButtonClick = (buttonName) => {
    setActiveButton(buttonName); // 클릭된 버튼에 따른 상태 변경
  };
  // 구 이름을 갱신하는 함수
  const handleDistrictChange = (newDistrict) => {
    setDistrictName(newDistrict);
  };

  return (
    <div className="mappage-ctrl-box">
      <NaverMap
        map={map}
        geoJson={gudata}
        showCurrentLocation={showCurrentLocation}
        activeButton={activeButton}
        handleButtonClick={handleButtonClick}
        handleDistrictChange={handleDistrictChange}
      />
      <Sidebar map={map} activeButton={activeButton} handleButtonClick={handleButtonClick} districtName={districtName}/>
      <MapHeader activeButton={activeButton} onToggleLocation={handleToggleLocation} onButtonClick={handleButtonClick} />
      <MapWebNav />
      {
        map && <AllWeather map={map} activeButton={activeButton} />
      }
    </div>
  )
}

export default Map;