import '../map/styles/TrainSearch.css';
import React, { useEffect, useState } from 'react';

function TrainSearch({ startStation, endStation, setStartStation, setEndStation, startLatLng, endLatLng }) {
  const [routeInfo, setRouteInfo] = useState(null); // 경로 정보 저장
  const [loading, setLoading] = useState(false); // 로딩 상태
  
  const trainchange = () => {
    const temp = startStation;
    setStartStation(endStation);
    setEndStation(temp);
  };

  const getCoordinates = async (stationName) => {
    try {
      const response = await fetch(
        `https://dapi.kakao.com/v2/local/search/keyword.json?query=${stationName}`,
        {
          method: 'GET',
          headers: {
            Authorization: 'KakaoAK bad3075e55f46fa4dce1d615ca70bce7',
          },
        }
      );
      const data = await response.json();

      if (data.documents.length > 0) {
        const { x, y } = data.documents[0];
        return { x, y };
      } else {
        throw new Error('역 정보를 찾을 수 없습니다.');
      }
    } catch (error) {
      console.error('위경도 검색 실패:', error);
      alert('역 정보를 가져오지 못했습니다. 다시 시도하세요.');
      return null;
    }
  };

  const searchRoute = async () => {
    if (!startStation || !endStation) {
      alert('출발지와 도착지를 입력하세요.');
      return;
    }

    setLoading(true);
    try {
      const startCoords = await getCoordinates(startStation);
      const endCoords = await getCoordinates(endStation);

      if (!startCoords || !endCoords) return;

      
    } catch (error) {
      console.error('경로 검색 실패:', error);
      alert('경로를 검색할 수 없습니다.');
    } 

    fetchTest();
  };

  const fetchTest = () => {
    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        appKey: 'Q5vfRZzFil9sEqN3W2jl74JRa1SKm8QF6j8bUoLW',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        startX: startLatLng.lat,
        startY: startLatLng.lng,
        endX: endLatLng.lat,
        endY: endLatLng.lng,
        lang: 0,
        format: 'json',
        count: 10
      })
    };
    
    fetch('https://apis.openapi.sk.com/transit/routes', options)
      .then(res => res.json())
      .then(res => {
        const result = res.metaData.plan.itineraries[0];
        console.log(result)
        console.log(result.fare.regular.totalFare)
        console.log(result.totalDistance)
        console.log(result.totalTime)

        const distanceInKm = (result.totalDistance / 1000).toFixed(2);
        const totalTimeInMinutes = Math.floor(result.totalTime / 60);
        const formattedFare = new Intl.NumberFormat('ko-KR').format(result.fare.regular.totalFare);
        
        setRouteInfo({
          distance : `${distanceInKm}km`,
          estimatedTime : totalTimeInMinutes,
          fare : `${formattedFare}원`
        }) 
      })
      .catch(err => console.error(err));
  }

  useEffect(() => {
    console.log('Route info updated:', routeInfo);
    setLoading(false);
  }, [routeInfo]);

  return (
    <div className="Trainsearch">
      <div className="Trainsearch-container">
        <div>
          <input
            type="search"
            id="search"
            placeholder="출발지를 입력하세요"
            value={startStation}
            onChange={(e) => setStartStation(e.target.value)}
          />
          <input
            type="search"
            id="search"
            placeholder="도착지를 입력하세요"
            value={endStation}
            onChange={(e) => setEndStation(e.target.value)}
          />
        </div>
        <i onClick={trainchange} className="fa-solid fa-rotate point"></i>
      </div>

      <div className="search-button">
        <button onClick={searchRoute} >
          {loading ? '검색 중...' : '경로 검색'}
        </button>
      </div>

      {routeInfo && (
        <div className="route-info">
          <h3>경로 정보</h3>
          <p>
            <strong>거리:</strong> {routeInfo.distance}
          </p>
          <p>
            <strong>예상 소요 시간:</strong> {routeInfo.estimatedTime}분
          </p>
          <p>
            <strong>요금:</strong> {routeInfo.fare}
          </p>
        </div>
      )}
    </div>
  );
}

export default TrainSearch;
