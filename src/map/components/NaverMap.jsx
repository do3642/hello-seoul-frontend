import { useEffect } from "react";
import MapHover from "../utils/maphover.js";

function NaverMap({ map, geoJson }) {
  useEffect(() => {
    if (map && geoJson) {
      // 지도 객체와 geoJson이 있을 때만 실행
      MapHover(map, geoJson);
    }
  }, [map, geoJson]); // map과 geoJson 변경 시마다 실행


  return(
    <>
      <div id="main-map" style={{position: 'absolute', width: '100vw', height: '100vh'}}/>
    </>
  )
}

export default NaverMap;