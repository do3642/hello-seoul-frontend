import zoomInToRegion from '/src/utils/zoomInToRegion'
import { createMarkersForDistrict,clearMarkers  } from '/src/utils/createMarkersForDistrict';
import { getWeatherData } from '../../utils/getFetchWeather'


function MapHover(map, geoJson, activeButton, handleClick, groupedSpots, handleDistrictChange, navigate) {
  let selectedFeature = null; // 현재 클릭된 지역을 저장하는 변수

  function resetSelectedFeature() {
    if (selectedFeature) {
      // 이전 선택된 지역 초기화
      map.data.revertStyle(selectedFeature);
      selectedFeature = null;
    }
  }
  
  if (map && geoJson) {
    // GeoJSON 데이터를 지도에 추가
    map.data.addGeoJson(geoJson);

    map.data.setStyle(function (feature) {
      var color = 'transparent';

      if (feature.getProperty('isColorful')) {
        color = feature.getProperty('color');
      }

      return {
        fillColor: color,
        strokeColor: color
      };
    });

    map.data.addListener('mouseover', function (e) {
     
      if (selectedFeature !== e.feature) {
        // 선택되지 않은 지역만 마우스 오버 스타일 적용
        map.data.overrideStyle(e.feature, {
          fillColor: 'rgb(209, 111, 21)',
          strokeColor: 'rgb(209, 111, 21)',
          strokeWeight: 3,
        });
      }

    });

    map.data.addListener('mouseout', function (e) {
      if (selectedFeature !== e.feature) {
        // 선택되지 않은 지역만 마우스 아웃 시 스타일 초기화
        map.data.revertStyle(e.feature);
      }
    });


    // 클릭 시 구로 확대, 관광지버튼활성화, 해당구 관광지마커, 팝업생성
    map.data.addListener('click', function (e) {
      resetSelectedFeature(); // 이전 선택된 지역 초기화

      selectedFeature = e.feature; // 현재 클릭된 피처 저장

      // 클릭된 피처 스타일 적용
      map.data.overrideStyle(selectedFeature, {
        fillColor: 'rgb(169, 118, 31)',
        strokeColor: 'rgb(169, 118, 31)',
        strokeWeight: 3,
      });
      var district = selectedFeature.getProperty('SIG_KOR_NM');
      // 구 클릭시 날씨변경
      handleDistrictChange(district)
      getWeatherData(district);

      // 그룹화된 데이터에서 해당 구의 관광지 리스트 가져오기
      const spots = groupedSpots[district];

      if (spots) {
        // 구에 해당하는 관광지가 있는 경우 마커 생성
        createMarkersForDistrict(map, district, activeButton, handleClick, spots, navigate);
      } else {
        console.warn(`${district}에 해당하는 관광지가 없습니다.`);
      }

      const bounds = selectedFeature.bounds;

      if (bounds) {
        const minPoint = bounds.getMin();
        const maxPoint = bounds.getMax();

        const latLngBounds = new naver.maps.LatLngBounds(
          new naver.maps.LatLng(minPoint.y, minPoint.x), // 좌하단(위도, 경도 순서)
          new naver.maps.LatLng(maxPoint.y, maxPoint.x), // 우상단(위도, 경도 순서)
        );

        zoomInToRegion(map, latLngBounds.getCenter().x, latLngBounds.getCenter().y, activeButton, handleClick);
      }

    });
    
  }

  if (activeButton !== "관광지") {
    clearMarkers();
  }

  return { resetSelectedFeature }; // 초기화 함수 반환
};

export default MapHover;