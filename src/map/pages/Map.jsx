import { useEffect, useState } from "react";
import MapHeader from "../components/MapHeader";
import NaverMap from "../components/NaverMap";
import Sidebar from "../components/Sidebar";
import gudata from "../data/Seoul_Gu.json";

function Map() {
  const [map, setMap] = useState(null);
  
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
  return (
    <>
      <NaverMap map={map} geoJson={gudata} />
      <Sidebar />
      <MapHeader />
    </>
  )
}

export default Map;