import '../styles/Weather.css'
import { getWeatherData } from '../../utils/getFetchWeather';
import { useEffect, useState } from 'react';
import SkyConditionIconHTML from '../utils/weatherUtilsHTML'; 
import LoadingSVG from '../../utils/loadingSVG'

function Weather({districtName}) {
  const [weatherInfo, setWeatherInfo] = useState({
    minTemp: null,
    maxTemp: null,
    weatherStatus: '',
  });

  // 날씨 정보 가져오는 함수
  const fetchWeather = async (district) => {
    try {
      const { minTemp, maxTemp, weatherStatus } = await getWeatherData(district);
      setWeatherInfo({ minTemp, maxTemp, weatherStatus });
    } catch (error) {
      console.error('날씨 정보를 가져오는 데 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    fetchWeather(districtName);
  }, [districtName]);

  const { minTemp, maxTemp, weatherStatus } = weatherInfo;

  return (
    <div className="weather">
      <div className="weather-left">
        <h3>{districtName}</h3>
      </div>
      <div className="weather-right">
        {minTemp !== null && maxTemp !== null ? (
          <p><SkyConditionIconHTML skyCondition={weatherStatus}/>  {minTemp}°C  /  {maxTemp}°C</p>
        ) : (
          <p><LoadingSVG /></p>
        )}
      </div>
    </div>
  )
}

export default Weather;
