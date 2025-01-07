import { useState, useEffect } from 'react';

// 각 구에 해당하는 nx, ny 좌표 (예시 값)
const districtCoordinates = {
  '강남구': { nx: 60, ny: 127 },
  '강동구': { nx: 61, ny: 128 },
  '강북구': { nx: 59, ny: 126 },
  '강서구': { nx: 64, ny: 130 },
  '구로구': { nx: 62, ny: 128 },
  '금천구': { nx: 63, ny: 129 },
  '노원구': { nx: 58, ny: 124 },
  // 다른 구들에 대한 nx, ny 값 추가
};

function AllWeather({ map }) {
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  // 날씨 데이터를 받아오는 함수
  const fetchWeatherData = async (nx, ny) => {
    const serviceKey = '5CQeftawhDwl1cz9L0RxxMn8mjHETjXzCuHxHgteyt%2FvAK1i50baokozMpWbrG%2FEb2yMXkwSwn18uBEylgUk0g%3D%3D';
    const baseDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const baseTime = '0530'; // 예시 시간
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
    const weatherResults = {};

    for (const district in districtCoordinates) {
      const { nx, ny } = districtCoordinates[district];

      // 각 구에 대해 날씨 정보 받아오기
      const weather = await fetchWeatherData(nx, ny);

      if (weather) {
        weatherResults[district] = weather;

        // 마커 생성
        
        const marker = new naver.maps.Marker({
          map: map,
          position: new naver.maps.LatLng(nx, ny),
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
      }
    }

    setWeatherData(weatherResults);  // 날씨 데이터 상태 업데이트
    setIsLoading(false);
  };

  useEffect(() => {
    if (map) {
      loadWeatherForDistricts(); // 지도 객체가 있을 때만 날씨 로드
    }
  }, [map]);

  if (isLoading) {
    return <div>날씨 데이터를 불러오는 중입니다...</div>;
  }

  return null;
}

export default AllWeather;
