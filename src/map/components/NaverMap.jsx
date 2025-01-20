import { useEffect, useState } from "react";
import MapHover from "../utils/mapHover.js";
import { TouristSpots } from "../../context/TouristSpotsContext.jsx";
import { useNavigate } from "react-router-dom";

function NaverMap({ map, geoJson, showCurrentLocation, activeButton, handleButtonClick,handleDistrictChange}) {
  const [marker, setMarker] = useState(null);
  const navigate = useNavigate();
  const handleClick = (buttonName) => {
    handleButtonClick(buttonName);
  };

  const { groupedSpots } = TouristSpots();

  useEffect(() => {
    if (map && geoJson) {
      // 지도 객체와 geoJson이 있을 때만 실행
      MapHover(map, geoJson, activeButton, handleClick, groupedSpots,handleDistrictChange,navigate);
    }
  }, [map, geoJson, activeButton, groupedSpots]); // map과 geoJson 변경 시마다 실행

  useEffect(() => {
    // 현재 위치의 정확도를 높이기 위한 옵션
    var options = {
      enableHighAccuracy: true,
      timeout: 30000,
      maximumAge: 2000,
    };

    if(map) {
      if(showCurrentLocation) {
        // 현재 위치 가져오기 및 마커 표시
        if(navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const lat = position.coords.latitude;
              const lng = position.coords.longitude;
              const currentLocation = new naver.maps.LatLng(lat, lng);

              if(marker) {
                // 이전 마커 제거
                marker.setMap(null);
              }

              const newMarker = new naver.maps.Marker({
                position: currentLocation,
                map: map,
                title: "나의 위치",
              });

              setMarker(newMarker);
              
              // 부드럽게 이동하고 줌하기
              map.morph(currentLocation, 17);
            },
            (error) => {
              console.error("위치를 가져올 수 없습니다.", error);
            },
            options
          );
        } else {
          alert("이 브라우저는 Geolocation을 지원하지 않습니다.");
        }
      } else {
        // 마커 제거
        if(marker) {
          marker.setMap(null);
          setMarker(null);
        }
      }
    }
  }, [showCurrentLocation]);

  return(
    <>
      <div id="main-map" style={{position: 'absolute', width: '100vw', height: '100vh'}}/>
    </>
  )
}

export default NaverMap;