import React, { useState, useEffect, useRef } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Subway from '../../subway.svg?react';
import './Line.css';
import Trainsidebar from './Trainsidebar';

const Line = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });



  const svgRef = useRef(null);
  const [selectedStation, setSelectedStation] = useState(null);
  const [startStation, setStartStation] = useState(null); // 출발지
  const [endStation, setEndStation] = useState(null); // 도착지
  const [startLatLng, setStartLatLng] = useState({}); // 출발지
  const [endLatLng, setEndLatLng] = useState({}); // 도착지
  const [clickedStation, setClickedStation] = useState(null); // 클릭된 역 정보
  

  useEffect(() => {
    const svgElement = svgRef.current;

    svgElement.addEventListener('click', svgClickHandler);

    return () => svgElement.removeEventListener('click', svgClickHandler);
  }, []);

  const svgClickHandler = (e) => {
    const target = e.target;

    if (target.tagName === 'tspan') {
      const stationName = target.textContent;
      const { x, y } = target.getBoundingClientRect();
      setClickedStation({ name: stationName, x, y });

     
      fetchData(stationName);
      setSelectedStation(stationName);
    }


  };

  // stationName 은 지하철 역이름저장 변수
  const fetchData = async (stationName) => {
    const headers = {
      Authorization: 'KakaoAK bad3075e55f46fa4dce1d615ca70bce7'
    }
    // 위경도 알려주는 api
    const response = await fetch(`https://dapi.kakao.com/v2/local/search/keyword?query=${stationName}역`, {
      method: 'GET',
      headers: headers,
    }
    );

    const data = await response.json();

    const stationX = data.documents[0].x;
    const stationY = data.documents[0].y;
    console.log(`위경도: ${stationX}, ${stationY}`);

    // 위경도 기준 반경내에 관광명소 알려주는 api ( AT4 : 관광명소 코드 )
    const responsePlace = await fetch(`https://dapi.kakao.com/v2/local/search/category?category_group_code=AT4&radius=2000&x=${stationX}&y=${stationY}`, {
      method: 'GET',
      headers: headers,
    }
    );

    const placesData = await responsePlace.json();
    console.log('관광명소:', placesData.documents);
    
  }

  const getLatLng = async (stationName) => {
    const headers = {
      Authorization: 'KakaoAK bad3075e55f46fa4dce1d615ca70bce7'
    }
    // 위경도 알려주는 api
    const response = await fetch(`https://dapi.kakao.com/v2/local/search/keyword?query=${stationName}역`, {
      method: 'GET',
      headers: headers,
    });

    const data = await response.json();

    const stationX = await data.documents[0].x;
    const stationY = await data.documents[0].y;
    console.log(`위경도: ${stationX}, ${stationY}`);

    return {stationX, stationY};
  }

  // 관광명소 데이터를 clickedStation에 저장
  //  setClickedStation((prev) => ({
  //   ...prev,
  //   places: placesData.documents,
  // }));
  // } else {
  // console.error('해당 역을 찾을 수 없습니다.');
  // setClickedStation((prev) => ({
  //   ...prev,
  //   places: [],
  // }));
  // }
  // } catch (error) {
  // console.error('API 요청 중 오류 발생:', error);
  // }
  // }
  // };

  // 화면 크기 변경 시, 크기 갱신
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 출발지와 도착지 초기화
  const resetStations = () => {
    setStartStation(null);
    setEndStation(null);
    setClickedStation(null);
  };

  return (
    <div id="Line" style={{ width: '100%', height: '100vh', position: 'relative' }}>
      <Trainsidebar selectedStation={selectedStation} startStation={startStation} endStation={endStation} setStartStation={setStartStation} setEndStation={setEndStation} startLatLng={startLatLng} endLatLng={endLatLng}/>

      {/* 미니 네비게이션 바 */}
      {clickedStation && (
        <div
          style={{
            position: 'absolute',
            top: `${clickedStation.y}px`,
            left: `${clickedStation.x}px`,
            backgroundColor: 'white',
            padding: '10px',
            borderRadius: '5px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)',
            zIndex: 10,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <p><strong>{clickedStation.name}</strong></p>
          <button
            onClick={async () => {
              setStartStation(clickedStation.name)
              const {stationX, stationY} = await getLatLng(clickedStation.name)

              setStartLatLng({"lat" : stationX, "lng" : stationY});
            }}
            style={{
              marginRight: '10px',
              padding: '5px 10px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            출발지로 설정
          </button>
          <button
            onClick={async () => {
              setEndStation(clickedStation.name)
              const {stationX, stationY} = await getLatLng(clickedStation.name)

              setEndLatLng({"lat" : stationX, "lng" : stationY});
            }}
            style={{
              padding: '5px 10px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            도착지로 설정
          </button>
          <button
            onClick={async () => {
              setClickedStation(null)

              const {stationX, stationY} = await getLatLng(clickedStation.name)

              setEndLatLng({"lat" : stationX, "lng" : stationY});
            }}
            style={{
              marginTop: '10px',
              padding: '5px 10px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '3px',
              cursor: 'pointer'
            }}
          >
            닫기
          </button>
        </div>
      )}

      {/* 지하철 노선도 */}
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={5}
        disabled={false}
        wheel={{ disabled: false, step: 0.1 }}
        pan={{ disabled: false }}
      >
        <TransformComponent>
          <svg
            ref={svgRef}
            width="100vw"
            height="100vh"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
          >
            <Subway />
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default Line;