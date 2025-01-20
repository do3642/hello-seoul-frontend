let markers = [];
let infoWindows = [];
let activeInfoWindow = null;

function createMarkersForDistrict(map, identifier, activeButton, handleClick, touristSpots) {
  // 활성화 버튼이 "관광지"가 아닐 경우, handleClick 호출
  if (activeButton !== "관광지") {
    handleClick("관광지");
  }

  // 기존 마커와 팝업 제거
  clearMarkers();

  // 구 또는 관광지 이름에 따라 관광지 필터링
  const spots = touristSpots.filter(spot => 
    spot.guName === identifier || spot.title === identifier
  );
  
  // 마커와 팝업 생성
  spots.forEach(spot => {
    const marker = new naver.maps.Marker({
      position: new naver.maps.LatLng(spot.mapy, spot.mapx),
      map: map,
      title: spot.title,
    });

    const infoWindow = new naver.maps.InfoWindow({
      content: `
        <div class='tourist-popup' style="
          padding: 10px; 
          background-color: #ffffff; 
          border: 1px solid #cccccc; 
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
          font-size: 14px; 
          color: #333;">
          <strong class='popup-info-strong' style="font-size: 16px; color: #007BFF;">${spot.title}</strong>
          <p class='popup-info-small' style="margin-top: 5px;">${spot.addr1}</p>
        </div>
      `,
      disableAnchor: 'false', // 말풍선 꼬리 사용
      backgroundColor: 'transparent', // 말풍선 배경색 투명
      borderColor: '#007BFF', // 테두리 색상
      borderWidth: 2, // 테두리 두께
      pixelOffset: new naver.maps.Point(0, -10) // 말풍선 위치 조정
    });

    naver.maps.Event.addListener(marker, 'click', function () {
      if (activeInfoWindow && activeInfoWindow !== infoWindow) {
        activeInfoWindow.close();
      }
      if (activeInfoWindow === infoWindow) {
        infoWindow.close();
        activeInfoWindow = null;
      } else {
        infoWindow.open(map, marker);
        activeInfoWindow = infoWindow;
      }
    });

    markers.push(marker);
    infoWindows.push(infoWindow);
  });
}

// 마커와 팝업을 모두 제거하는 함수
function clearMarkers() {
  // 모든 마커 제거
  markers.forEach(marker => marker.setMap(null));
  markers = []; // 배열 초기화

  infoWindows.forEach(window => window.close());
  infoWindows = []; // 배열 초기화

  activeInfoWindow = null;
}

export { createMarkersForDistrict, clearMarkers };
