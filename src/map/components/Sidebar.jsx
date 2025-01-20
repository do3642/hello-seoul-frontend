import Search from "./Search";
import '../styles/Sidebar.css';
import SidebarList from "./SidebarList";
import Weather from "./Weather";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouristSpots } from "../../context/TouristSpotsContext";
import Pagination from "./pagination";
import zoomInToRegion from "../../utils/zoomInToRegion";
import { clearMarkers, createMarkersForDistrict } from "../../utils/createMarkersForDistrict";

function Sidebar({ map, activeButton, handleButtonClick, resetFeature }) {
  const { touristSpots, currentPage, totalPages, setCurrentPage } = TouristSpots();
  const { i18n } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarHeight, setSidebarHeight] = useState(0);

  const selectedLanguage = i18n.language; // 현재 선택된 언어 코드

  const handleListClick = (event) => {
    // currentTarget을 사용해 클릭된 요소의 부모 요소에 접근
    const lon = parseFloat(event.currentTarget.getAttribute('data-lon'));
    const lat = parseFloat(event.currentTarget.getAttribute('data-lat'));

    // 클릭된 리스트에서 관광지 이름에 접근할 수 있도록 함.
    const spotName = event.currentTarget.querySelector('p').textContent;
  
    // 좌표가 유효한지 확인 (NaN 체크)
    if (isNaN(lon) || isNaN(lat)) {
      console.error("Invalid coordinates:", lon, lat);
      return;
    }

    // 기존 선택 지역 초기화
    if (resetFeature) resetFeature();

    // 지도에 관광지 하나에 대한 마커 생성
    clearMarkers();
    createMarkersForDistrict(map, spotName, activeButton, handleButtonClick, touristSpots);
  
    // 좌표를 이용해 지도 확대
    zoomInToRegion(map, lon, lat, activeButton, handleButtonClick);
  };

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

  return (
        <>
          {windowWidth > 820 ? (
            <div className="side-bar">
              <Search />
              <Weather />
              <div className="sidebar-list-box" style={{ height: sidebarHeight, overflowY: 'scroll' }}>
                {touristSpots.map((spot, index) => (
                  <SidebarList key={index} spot={spot} onClick={handleListClick} />
                ))}
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          ) : (
            <>
              <Search />
              <div className="side-bar">
                <Weather />
                <div className="sidebar-list-box" style={{ height: '200px', overflowY: 'auto' }}>
                  {touristSpots.map((spot, index) => (
                    <SidebarList key={index} spot={spot} onClick={handleListClick} />
                  ))}
                  <Pagination 
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </div>
              </div>
            </>
          )}
        </>
  );
}

export default Sidebar;