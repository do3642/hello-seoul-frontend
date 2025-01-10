
// 지도 확대 함수
function zoomInToRegion(map, x, y, activeButton, handleClick) {
  // 관광지 버튼이 활성화되지 않았다면, 관광지로 변경
  if (activeButton !== "관광지") {
    handleClick("관광지");
  }

  // 확대할 좌표를 받아서 확대 처리
  const center = new naver.maps.LatLng(y, x); // x, y 좌표로 중심 설정
  map.morph(center, 14, 'linear'); // 확대
}

export default zoomInToRegion;
