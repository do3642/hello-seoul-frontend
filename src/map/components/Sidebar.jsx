import Search from "./Search";
import '../styles/Sidebar.css';
import SidebarList from "./SidebarList";
import Weather from "./Weather";
import { useEffect, useState } from "react";

function Sidebar() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth); // 화면 크기 변경 시 상태 업데이트
    };

    window.addEventListener("resize", handleResize); // 리사이즈 이벤트 추가

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
            <SidebarList /> 
          </div>
          ) : (
            <>
            <Search /> 
            <div className="side-bar">
              <Weather />
              <SidebarList /> 
            </div>
            </>
          )}

    </>
  )
}

export default Sidebar;