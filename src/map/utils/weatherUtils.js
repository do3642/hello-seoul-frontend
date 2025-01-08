// src/utils/weatherUtils.js

// skyCondition에 따른 상태를 구분하는 함수
export const getSkyConditionText = (skyCondition) => {
  switch (skyCondition) {
    case '1': return '맑음'; // Clear
    case '3': return '구름 많음'; // Partly Cloudy
    case '4': return '흐림'; // Cloudy
    default: return '알 수 없음'; // Unknown
  }
};

// skyCondition에 따른 아이콘을 반환하는 함수
export const getSkyConditionIcon = (skyCondition) => {
  switch (skyCondition) {
    case '1': return '<i class="fas fa-sun"></i>'; // Clear
    case '3': return '<i class="fas fa-cloud-sun"></i>'; // Partly Cloudy
    case '4': return '<i class="fas fa-cloud"></i>'; // Cloudy
    case '5': return '<i class="fas fa-smog"></i>'; // Mist/Fog
    case '6': return '<i class="fas fa-cloud-showers-heavy"></i>'; // Rain
    case '7': return '<i class="fas fa-snowflake"></i>'; // Snow
    case '8': return '<i class="fas fa-cloud-rain"></i>'; // Drizzle
    case '9': return '<i class="fas fa-cloud-showers-heavy"></i>'; // Heavy Rain
    case '10': return '<i class="fas fa-bolt"></i>'; // Thunderstorm
    default: return '<i class="fas fa-question-circle"></i>'; // Unknown
  }
};
