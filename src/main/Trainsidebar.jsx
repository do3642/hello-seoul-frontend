
import { useEffect, useState } from "react";
import Search from '../map/components/Search';
import Weather from "./Weather";
import SidebarList from "../map/components/SidebarList";
import TrainSearch from "./TrainSearch";

function Trainsidebar({selectedStation, startStation, endStation, setStartStation ,setEndStation, startLatLng, endLatLng}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [touristSpots, setTouristSpots] = useState([]);
  const [sidebarHeight, setSidebarHeight] = useState(0);


  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // 화면 크기 변경 시 상태 업데이트

      if (window.innerWidth > 820) {
        // 데스크탑 환경: .weather와 .search의 높이를 제외한 값
        const weatherHeight = document.querySelector('.weather')?.offsetHeight || 0;
        const searchHeight = document.querySelector('.search')?.offsetHeight || 0;
        const newHeight = window.innerHeight - weatherHeight - searchHeight;
        setSidebarHeight(newHeight); // 높이를 동적으로 설정
      } else {
        setSidebarHeight('auto'); // 모바일 환경에서는 자동으로 설정
      }
    };



    
    window.addEventListener("resize", handleResize); // 리사이즈 이벤트 추가
    handleResize() // 초기 실행
    return () => {
      window.removeEventListener("resize", handleResize); // 리사이즈 이벤트 정리
    };
  }, []);


  useEffect(() => {

    const fetchTouristSpots = async () => {
      try {
        const response = await fetch('/src/data/touristSpots.json');  // public 폴더에 있는 JSON 파일 경로
        const data = await response.json();
        setTouristSpots(data); // 가져온 데이터 상태에 저장
      } catch (error) {
        console.error('데이터를 불러오는 데 실패했습니다:', error);
      }
    };

    fetchTouristSpots(); // 데이터 호출
  }, []);



  return (
    <>
        {windowWidth > 820 ? (
          <div className="side-bar">
            <TrainSearch startStation={startStation} endStation={endStation}  setStartStation={setStartStation} setEndStation={setEndStation}  startLatLng={startLatLng} endLatLng={endLatLng}/> 
            <p style={{textAlign:'center'}}>{selectedStation}</p>
            <Weather />
            <div className="sidebar-list-box" style={{ height: sidebarHeight, overflowY: 'scroll' }}>
              {touristSpots.map((spot, index) => (
              <SidebarList key={index} spot={spot} />
              ))}
            </div>
          </div>
          ) : (
            <>
            <Search /> 
            <div className="side-bar">
              <Weather />
              <div className="sidebar-list-box" style={{ height: '200px', overflowY: 'auto' }}>
                {touristSpots.map((spot, index) => (
                <SidebarList key={index} spot={spot} />
                ))}
              </div>
            </div>
            </>
          )}

    </>
  )
}

export default Trainsidebar;