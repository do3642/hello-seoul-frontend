import zoomInToRegion from '/src/utils/zoomInToRegion'
import { createMarkersForDistrict,clearMarkers  } from '/src/utils/createMarkersForDistrict';
import { getWeatherData } from '../../utils/getFetchWeather'


function MapHover(map, geoJson, activeButton, handleClick, groupedSpots,handleDistrictChange) {
  
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
      var color = 'rgb(209, 111, 21)'

      map.data.overrideStyle(e.feature, {
        fillColor: color,
        strokeColor: color,
        strokeWeight: 3,
      });
    });

    map.data.addListener('mouseout', function (e) {
      map.data.revertStyle();
    });


    // 클릭 시 구로 확대, 관광지버튼활성화, 해당구 관광지마커,팝업생성
    map.data.addListener('click', function (e) {
      var color = 'rgb(169, 118, 31)'

      map.data.overrideStyle(e.feature, {
        fillColor: color,
        strokeColor: color,
        strokeWeight: 3,
      });
      
      var clickedFeature = e.feature;
      var district = clickedFeature.getProperty('SIG_KOR_NM');
      // 구 클릭시 날씨변경
      handleDistrictChange(district)
      getWeatherData(district);

      // 그룹화된 데이터에서 해당 구의 관광지 리스트 가져오기
      const spots = groupedSpots[district];

      if (spots) {
        // 구에 해당하는 관광지가 있는 경우 마커 생성
        createMarkersForDistrict(map, district, activeButton, handleClick, spots);
      } else {
        console.warn(`No tourist spots found for district: ${district}`);
      }

      var bounds = clickedFeature.bounds;

      if (bounds) {
       
        var minPoint = bounds.getMin();
        var maxPoint = bounds.getMax();
    
        var latLngBounds = new naver.maps.LatLngBounds(
          new naver.maps.LatLng(minPoint.y, minPoint.x), // 좌하단 (위도, 경도 순서)
          new naver.maps.LatLng(maxPoint.y, maxPoint.x)  // 우상단 (위도, 경도 순서)
        );
        zoomInToRegion(map, latLngBounds.getCenter().x, latLngBounds.getCenter().y, activeButton, handleClick);

      }
    });
    
    
    

  }
  if (activeButton !== "관광지") {
    clearMarkers();
  }
};

export default MapHover;