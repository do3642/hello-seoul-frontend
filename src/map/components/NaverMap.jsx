import { useEffect } from "react";
import MapHover from "../utils/maphover.js";
import gudata from "../../data/Seoul_Gu.json";

function NaverMap() {
  useEffect(() => {

    // 지도 초기화
    var mapOptions = {
      center: new naver.maps.LatLng(37.566535, 126.9779692),
      zoom: 12
    }

    var newMap = new naver.maps.Map('main-map', mapOptions);
    MapHover(newMap, gudata)
  }, [])

  return(
    <>
      <div id="main-map" style={{position: 'absolute', width: '100vw', height: '100vh'}}/>
    </>
  )
}

export default NaverMap;