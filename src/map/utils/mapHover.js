import touristSpots from '/src/data/touristSpots.json'
let markers = [];
let infoWindows = [];
let activeInfoWindow = null;

function clearMarkers() {
  // 모든 마커 제거
  markers.forEach(marker => marker.setMap(null));
  markers = []; // 배열 초기화

  infoWindows.forEach(window => window.close());
  infoWindows = []; // 배열 초기화

  activeInfoWindow = null;
}

function MapHover(map, geoJson,activeButton,handleClick) {
  
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


    // 클릭 시 구로 확대
    map.data.addListener('click', function (e) {
      clearMarkers(); 
      if (activeButton !== "관광지") {
      handleClick("관광지");
      }
      var clickedFeature = e.feature;
      var district = clickedFeature.getProperty('SIG_KOR_NM');
      var spots = touristSpots.filter(spot => spot.district === district);
      

      spots.forEach(spot => {
        var marker = new naver.maps.Marker({
          position: new naver.maps.LatLng(spot.coordinates.lat, spot.coordinates.lng),
          map: map,
          title: spot.touristName,
        });

         // 정보 창 생성
         var infoWindow = new naver.maps.InfoWindow({
          content: `<div style="padding:5px;">${spot.touristName}</div>`,
        });

        // 마커에 클릭 이벤트 추가하여 정보 창 표시
        naver.maps.Event.addListener(marker, 'click', function () {
          if (activeInfoWindow && activeInfoWindow !== infoWindow) {
            activeInfoWindow.close(); // 이전 정보 창 닫기
          }
          if (activeInfoWindow === infoWindow) {
            infoWindow.close(); // 동일한 정보 창 닫기
            activeInfoWindow = null; // 상태 초기화
          } else {
            infoWindow.open(map, marker); // 정보 창 열기
            activeInfoWindow = infoWindow; // 활성 정보 창 업데이트
          }
        });

        markers.push(marker); // 마커를 배열에 추가
        infoWindows.push(infoWindow);
      });

      var bounds = clickedFeature.bounds;

      if (bounds) {
       
        var minPoint = bounds.getMin();
        var maxPoint = bounds.getMax();
    
        var latLngBounds = new naver.maps.LatLngBounds(
          new naver.maps.LatLng(minPoint.y, minPoint.x), // 좌하단 (위도, 경도 순서)
          new naver.maps.LatLng(maxPoint.y, maxPoint.x)  // 우상단 (위도, 경도 순서)
        );
    
        var center = latLngBounds.getCenter();
        map.morph(center,14,'linear')
      }
    });
    
    
    

  }
  if (activeButton !== "관광지") {
    clearMarkers();
  }
};

export default MapHover;