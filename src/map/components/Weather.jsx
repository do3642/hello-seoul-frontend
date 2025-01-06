import '../styles/Weather.css'

function Weather() {

  return (
    <div className="weather">
      <div className="weather-left">
        <h3>지역 이름</h3>
      </div>
      <div className="weather-right">
        <p>날씨  /  최저  /  최고</p>
        <p>맑음  / -6.3  / -1.5</p>
      </div>
    </div>
  )
}

export default Weather