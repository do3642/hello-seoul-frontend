import { useState, useEffect } from 'react';
import districtData from '../../data/district_nx_ny_values.json'; // district_nx_ny_values.json 파일 임포트
import { getBaseTime } from '../utils/timeUtils';
import { getSkyConditionText, getSkyConditionIcon } from '../utils/weatherUtils';
import { useTranslation } from 'react-i18next';

function AllWeather({ map, activeButton }) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [markers, setMarkers] = useState([]); // 마커 상태 추가
  const [infoWindows, setInfoWindows] = useState([]); // infoWindow 상태 추가
  

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
    // setIsLoading(true);
    const weatherResults = [];

    // districtData는 이제 `district_nx_ny_values.json`에서 가져온 데이터
    const weatherPromises = Object.keys(districtData).map(async (district) => {
      const { nx, ny, latitude, longitude } = districtData[district];

      // 각 구에 대해 날씨 정보 받아오기
      const weather = await fetchWeatherData(nx, ny);

      return { district, latitude, longitude, weather };
    });

    // 먼저 마커를 생성하고, 날씨 데이터가 준비되면 업데이트
    const newMarkers = Object.keys(districtData).map((district) => {
      const { latitude, longitude } = districtData[district];
      const marker = new naver.maps.Marker({
        map: map,
        position: new naver.maps.LatLng(latitude, longitude),
        title: district,  // 마커에 툴팁 추가
        zIndex: 1000,
        visible: true,
      });

      return marker;
    });
    setMarkers(newMarkers); // 마커 먼저 상태에 저장

    // 날씨 데이터를 받아온 후 마커에 팝업을 추가하는 작업
    const weatherData = await Promise.all(weatherPromises);

    // 날씨 정보가 준비되면 팝업을 업데이트
    weatherData.forEach((data, index) => {
      const marker = newMarkers[index];
      const weather = data.weather;
      
      if (weather) {
        // InfoWindow 생성
        const createContentString = () => {
          return `
            <div class="iw_inner weather-popup">
              <h3>${t(`map-page.districts.${data.district}`)}</h3>
              <p>${t('map-page.minTemp')}: ${weather.minTemperature}°C</p>
              <p>${t('map-page.maxTemp')}: ${weather.maxTemperature}°C</p>
              <p>${t('map-page.status')}: ${getSkyConditionIcon(weather.skyCondition)} ${t(`map-page.weatherConditions.${getSkyConditionText(weather.skyCondition)}`)}</p>
            </div>
          `;
        };

        const infoWindow = new naver.maps.InfoWindow({
          content: createContentString(),
          zIndex: 1000,   // 팝업이 다른 요소 위에 오도록 설정
          backgroundColor: "#fff", // 배경 색상
          borderColor: "#cccccc",  // 테두리 색상
          borderWidth: 1, // 테두리 두께
          disableAnchor: 'false',  // 말풍선 꼬리 사용
          disableAutoPan: 'true', // 팝업 자동 이동을 비활성화
          pixelOffset: new naver.maps.Point(0, -10), // 팝업 위치 조정
        });
        

        // 마커 클릭 시 InfoWindow 열기
        naver.maps.Event.addListener(marker, "click", function() {
          // 클릭한 마커에 대한 팝업을 열고 닫기 처리
          const isOpen = infoWindow.getMap();
          if (isOpen) {
            infoWindow.close();
          } else {
            // 열려있는 팝업이 있으면 닫고 새로 연다
            infoWindows.forEach(window => window.close());
            infoWindow.open(map, marker);
          }
        });

        setInfoWindows(prevInfoWindows => [...prevInfoWindows, infoWindow]); // infoWindow 상태 업데이트
      }
    });
  };

  useEffect(() => {
    if (activeButton !== '날씨') {
      markers.forEach(marker => marker.setMap(null)); // 모든 마커 제거
      infoWindows.forEach(window => window.close()); // 모든 팝업 닫기
      setMarkers([]); // 마커 상태 초기화
      setInfoWindows([]); // infoWindow 상태 초기화
    } else if (map && activeButton === '날씨') {
      // '날씨' 버튼이 클릭된 경우, 날씨 데이터를 로드
      loadWeatherForDistricts(); // 날씨 로드
      setIsLoading(false);
    }
    
    if (t) {
      infoWindows.forEach(window => window.close());
      setInfoWindows([]); // 팝업 상태 초기화
    }
    
    // clean-up 함수: 컴포넌트가 언마운트되거나 activeButton이 변경될 때 마커 및 팝업 제거
    return () => {
      markers.forEach(marker => marker.setMap(null)); // 마커 제거
      infoWindows.forEach(window => window.close()); // 팝업 닫기
      setMarkers([]); // 상태 초기화
      setInfoWindows([]); // 상태 초기화
    };
  }, [map, activeButton,t]);

  if (isLoading && activeButton === '날씨') {
    return <div>날씨 데이터를 불러오는 중입니다...</div>;
  }

  return null;
}

export default AllWeather;
