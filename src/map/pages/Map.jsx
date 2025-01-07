import { useEffect, useState } from "react";
import MapHeader from "../components/MapHeader";
import MapWebNav from "../components/MapWebNav";
import NaverMap from "../components/NaverMap";
import Sidebar from "../components/Sidebar";
import gudata from "../../data/Seoul_Gu.json"
import AllWeather from "../components/AllWeather";

function Map() {
  const [map, setMap] = useState(null);
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);    // 현재 위치 표시 여부
  
  useEffect(() => {
    // 지도 초기화
    const mapOptions = {
      center: new naver.maps.LatLng(37.566535, 126.9779692), 
      zoom: 12, // 줌 레벨
    };
    const newMap = new naver.maps.Map('main-map', mapOptions);
    setMap(newMap);

    return () => {
      // 컴포넌트 언마운트 시 map 객체 정리
      newMap.destroy();
    };
  }, []);


    // 내 위치 버튼이 눌렸을 때 상태 변경
    const handleToggleLocation = (isActive) => {
      setShowCurrentLocation(isActive);
    };

  return (
    <>
      <NaverMap  map={map} geoJson={gudata} showCurrentLocation={showCurrentLocation}/>
      <Sidebar />
      <MapHeader onToggleLocation={handleToggleLocation}/>
      <MapWebNav />
      {
        map &&
        <AllWeather map={map}/>
      }
    </>
  )
}

export default Map;