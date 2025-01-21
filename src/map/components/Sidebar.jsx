import Search from "./Search";
import '../styles/Sidebar.css';
import SidebarList from "./SidebarList";
import Weather from "./Weather";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { TouristSpots } from "../../context/TouristSpotsContext";
import Pagination from "./Pagination";
import zoomInToRegion from "../../utils/zoomInToRegion";
import { clearMarkers, createMarkersForDistrict, openAllInfoWindows } from "../../utils/createMarkersForDistrict";
import { Outlet, useNavigate, useParams } from "react-router-dom";

import axios from "axios";

function Sidebar({ map, activeButton, handleButtonClick, districtName, resetFeature,}) {
  const { touristSpots, currentPage, totalPages, setCurrentPage, setTouristSpots, setTotalPages } = TouristSpots();

  const { i18n } = useTranslation();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [sidebarHeight, setSidebarHeight] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const [query, setQuery] = useState(""); // 검색어


  const navigate = useNavigate();

  
  const [startY, setStartY] = useState(0);
  const [currentY, setCurrentY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const { contentid } = useParams();

  const selectedLanguage = i18n.language; // 현재 선택된 언어 코드y

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
    createMarkersForDistrict(map, spotName, activeButton, handleButtonClick, touristSpots, navigate);
    openAllInfoWindows();

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
  

  
  useEffect(() => {

  }, [query, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page); // 페이지 변경
  };



  // 모바일 고려 터치이벤트들
  useEffect(() => {
    if (windowWidth <= 820) {
      const handleTouchStart = (e) => {
        setStartY(e.touches[0].clientY);
        setIsDragging(true);
      };

      const handleTouchMove = (e) => {
        if (!isDragging) return;
        setCurrentY(e.touches[0].clientY);
        let distance = currentY - startY;

        // 이동 거리 제한
        if (distance > 30) distance = 30;
        if (distance < -30) distance = -30;

        const sidebarElement = document.querySelector('.side-bar');
        sidebarElement.style.transform = `translateY(${distance}px)`; // 제한된 이동 효과
      };

      const handleTouchEnd = () => {
        setIsDragging(false);
        const distance = startY - currentY;

        const sidebarElement = document.querySelector('.side-bar');
        sidebarElement.style.transform = 'translateY(0)'; // 드래그 끝나면 원래 위치로

        if (distance > 50) {
          setIsActive(true);
        } else if (distance < -50) {
          setIsActive(false);
        }

        setCurrentY(0); // 초기화
      };

      const sidebarElement = document.querySelector('.side-bar');
      sidebarElement.addEventListener('touchstart', handleTouchStart);
      sidebarElement.addEventListener('touchmove', handleTouchMove);
      sidebarElement.addEventListener('touchend', handleTouchEnd);

      return () => {
        sidebarElement.removeEventListener('touchstart', handleTouchStart);
        sidebarElement.removeEventListener('touchmove', handleTouchMove);
        sidebarElement.removeEventListener('touchend', handleTouchEnd);
      };
    }
    
  }, [windowWidth, startY, currentY, isDragging]);




  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      {windowWidth > 820 ? (
        <div className='side-bar'>

          <Search />
          <Weather districtName={districtName} />
          <div className="sidebar-list-box" style={{ height: sidebarHeight, overflowY: 'scroll' }}>
            {!contentid && (
              <>

                {touristSpots && touristSpots.length > 0 ? (
                  touristSpots.map((spot, index) => (
                    <SidebarList key={index} spot={spot} onClick={handleListClick} />
                  ))
                ) : (
                  <p>데이터를 로딩 중입니다...</p> // 로딩 중일 때 표시할 메시지
                )}

                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </>
            )}
            {contentid && <Outlet />}
          </div>
        </div>
      ) : (
        <>
          <Search />
          <div className={`side-bar ${isActive ? 'active' : ''}`} onClick={handleToggle}>
            <Weather districtName={districtName} />
            <div className="sidebar-list-box" style={{ height: '200px', overflowY: 'auto' }}>
              {!contentid && (
                <>

                  {touristSpots && touristSpots.length > 0 ? (
                  touristSpots.map((spot, index) => (
                    <SidebarList key={index} spot={spot} onClick={handleListClick} />
                  ))
                ) : (
                  <p>데이터를 로딩 중입니다...</p> // 로딩 중일 때 표시할 메시지
                )}

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
              {contentid && <Outlet />}
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Sidebar;