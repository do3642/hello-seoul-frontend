import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getBaseTime } from '../map/utils/timeUtils';
import LoadingSVG from '../utils/loadingSVG'

function Weather() {
  const { t } = useTranslation();

  const [temperature, setTemperature] = useState({ min: null, max: null }); // 최저/최고 온도 상태
  const [weatherStatus, setWeatherStatus] = useState(''); // 날씨 상태
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 처리 상태

  // 날씨 데이터를 가져오는 함수
  const fetchWeatherData = async () => {
    const serviceKey = '5CQeftawhDwl1cz9L0RxxMn8mjHETjXzCuHxHgteyt%2FvAK1i50baokozMpWbrG%2FEb2yMXkwSwn18uBEylgUk0g%3D%3D'; //무료 키, 포트폴리오 용도라 그대로 사용
    const baseDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const baseTime = getBaseTime();
    const nx = 60; 
    const ny = 127; 
    const numOfRows = 1000;
    const pageNo = 1; 
    const dataType = 'JSON'; 

    // API URL
    const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

    try {
      const response = await fetch(url); // API 호출
      const data = await response.json(); // JSON 응답 파싱
      const items = data.response.body.items.item;

      // 최저/최고 온도를 추출하는 로직
      const temperatureData = items.filter(item => item.category === 'T1H'); // 'T1H'는 온도 데이터 카테고리
      
      let minTemp = null;
      let maxTemp = null;

      // 날씨 상태 추출 (예시로 'SKY' 카테고리 사용)
      const skyData = items.find(item => item.category === 'SKY'); // 'SKY'는 하늘 상태 카테고리 (맑음, 흐림 등)
      const skyCondition = skyData ? skyData.fcstValue : ''; // 날씨 상태 값 (0: 맑음, 1: 흐림, 2: 비, 3: 눈 등)
      
      let icon = ''; // 아이콘 설정 변수
      if (skyCondition === '1') {
        icon = 'fas fa-cloud'; // 흐림
        setWeatherStatus('흐림');
      } else if (skyCondition === '2') {
        icon = 'fas fa-cloud-showers-heavy'; // 비옴
        setWeatherStatus('비옴');
      } else if (skyCondition === '3') {
        icon = 'fas fa-snowflake'; // 눈옴
        setWeatherStatus('눈옴');
      } else {
        icon = 'fas fa-sun'; // 맑음
        setWeatherStatus('맑음');
      }

      // 온도 계산
      temperatureData.forEach(item => {
        const temp = parseFloat(item.fcstValue); // 온도 값을 숫자로 변환
        if (minTemp === null || temp < minTemp) minTemp = temp;
        if (maxTemp === null || temp > maxTemp) maxTemp = temp;
      });

      setTemperature({ min: minTemp, max: maxTemp }); // 상태 업데이트
      setIsLoading(false); // 로딩 완료
    } catch (err) {
      setError(err); // 에러 발생 시 에러 상태 저장
      setIsLoading(false); // 로딩 완료
    }
  };

  useEffect(() => {
    fetchWeatherData(); // 컴포넌트가 마운트되면 날씨 데이터 가져오기
  }, []); // 빈 배열로 설정하여 한 번만 호출

  // 로딩 중일 때, 에러 발생 시, 또는 데이터가 있을 때의 처리
  if (isLoading) return <div>{LoadingSVG()}</div>;
  if (error) return <div>날씨API 점검중</div>;

  return (
    <div className="weather-container">
      {/* 날씨 상태 아이콘과 텍스트 */}
      <div className="weather-icon">
        <i className={weatherStatus === '맑음' ? 'fas fa-sun' :
                      weatherStatus === '흐림' ? 'fas fa-cloud' :
                      weatherStatus === '비옴' ? 'fas fa-cloud-showers-heavy' :
                      weatherStatus === '눈옴' ? 'fas fa-snowflake' :
                      'fas fa-question-circle'}></i>
      </div>
      <h2>{t('weather')}</h2>

      {temperature.min !== null && temperature.max !== null ? (
        <div className='weather-temperature'>
          <span>{temperature.min} /</span>
          <span>{temperature.max}°C</span>
        </div>
      ) : (
        <p>{LoadingSVG()}</p>
      )}
    </div>
  );
}

export default Weather;
