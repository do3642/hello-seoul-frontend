import { useState, useEffect } from 'react';
import districtData from '../../data/district_nx_ny_values.json'; // district_nx_ny_values.json 파일 임포트
import { getBaseTime } from '../utils/timeUtils'


function AllWeather({ map, activeButton }) {
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([]); // 마커 상태 추가

  // 날씨 데이터를 받아오는 함수
  const fetchWeatherData = async (nx, ny) => {
    const serviceKey = '5CQeftawhDwl1cz9L0RxxMn8mjHETjXzCuHxHgteyt%2FvAK1i50baokozMpWbrG%2FEb2yMXkwSwn18uBEylgUk0g%3D%3D';
    const baseDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const baseTime = getBaseTime(); // 예시 시간
    const numOfRows = 40;
    const pageNo = 1;
    const dataType = 'JSON';

    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      const items = data.response.body.items.item;
      const temperatureData = items.filter(item => item.category === 'T1H');
      const skyData = items.find(item => item.category === 'SKY');
      
      // 온도에서 최저, 최고 온도만 추출
      const temperatures = temperatureData.map(item => parseFloat(item.fcstValue));
      const minTemperature = Math.min(...temperatures);
      const maxTemperature = Math.max(...temperatures);
      
      const skyCondition = skyData ? skyData.fcstValue : '';

      return { minTemperature, maxTemperature, skyCondition };
    } catch (err) {
      console.error("날씨 데이터 가져오기 실패", err);
      return null;
    }
  };

  // 각 구의 날씨 데이터를 받아오고 지도에 팝업을 표시하는 함수
  const loadWeatherForDistricts = async () => {
    const weatherResults = [];

    // districtData는 이제 `district_nx_ny_values.json`에서 가져온 데이터
    const weatherPromises = Object.keys(districtData).map(async (district) => {
      const { nx, ny, latitude, longitude } = districtData[district];

      // 각 구에 대해 날씨 정보 받아오기
      const weather = await fetchWeatherData(nx, ny);

      if (weather) {
        const marker = new naver.maps.Marker({
          map: map,
          position: new naver.maps.LatLng(latitude, longitude),
          title: district,  // 마커에 툴팁 추가
          zIndex: 1000,
          visible: true,
        });

        // InfoWindow 생성
        const contentString = `
          <div class="iw_inner">
            <h3>${district}</h3>
            <p>최저 온도: ${weather.minTemperature}°C</p>
            <p>최고 온도: ${weather.maxTemperature}°C</p>
            <p>상태: ${weather.skyCondition === '1' ? '맑음' : '흐림'}</p>
          </div>
        `;
        const infoWindow = new naver.maps.InfoWindow({
          content: contentString,
          maxWidth: 200,  // 팝업 크기 조정
          zIndex: 1000,   // 팝업이 다른 요소 위에 오도록 설정
        });

        // 마커 클릭 시 InfoWindow 열기
        naver.maps.Event.addListener(marker, "click", function() {
          if (infoWindow.getMap()) {
            infoWindow.close();
          } else {
            infoWindow.open(map, marker);  // 마커를 anchor로 설정하여 팝업 위치 결정
          }
        });

        return marker; // 마커 객체 반환
      }
    });

    // 모든 날씨 데이터 로드를 병렬로 처리
    const newMarkers = await Promise.all(weatherPromises);
    
    setMarkers(newMarkers.filter(marker => marker)); // null이 아닌 마커만 추가
    setIsLoading(false);
  };

  useEffect(() => {
    if (activeButton !== '날씨') {
      markers.forEach(marker => marker.setMap(null)); // 모든 마커 제거
      setMarkers([]); // 마커 상태 초기화
    }

    if (map && activeButton === '날씨') {
      loadWeatherForDistricts(); // 날씨 로드
    }
  }, [map, activeButton]);

  if (isLoading) {
    return <div>날씨 데이터를 불러오는 중입니다...</div>;
  }

  return null;
}

export default AllWeather;
