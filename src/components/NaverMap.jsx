import { useEffect } from "react";

function NaverMap() {
  useEffect(() => {
    var mapOptions = {
      center: new naver.maps.LatLng(37.566535, 126.9779692),
      zoom: 12
    }

    var map = new naver.maps.Map('main-map', mapOptions);
  }, [])

  return(
    <>
      <div id="main-map" style={{width: '100vw', height: '100vh'}}/>
    </>
  )
}

export default NaverMap;