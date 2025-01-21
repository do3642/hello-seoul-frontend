// src/utils/weatherUtilsHTML.jsx
import React from 'react';

// skyCondition에 따른 아이콘을 반환하는 React 컴포넌트
const SkyConditionIconHTML = ({ skyCondition }) => {
  switch (skyCondition) {
    case '1': return <i className="fas fa-sun"></i>; // Clear
    case '3': return <i className="fas fa-cloud-sun"></i>; // Partly Cloudy
    case '4': return <i className="fas fa-cloud"></i>; // Cloudy
    case '5': return <i className="fas fa-smog"></i>; // Mist/Fog
    case '6': return <i className="fas fa-cloud-showers-heavy"></i>; // Rain
    case '7': return <i className="fas fa-snowflake"></i>; // Snow
    case '8': return <i className="fas fa-cloud-rain"></i>; // Drizzle
    case '9': return <i className="fas fa-cloud-showers-heavy"></i>; // Heavy Rain
    case '10': return <i className="fas fa-bolt"></i>; // Thunderstorm
    default: return <i className="fas fa-question-circle"></i>; // Unknown
  }
};

export default SkyConditionIconHTML;
