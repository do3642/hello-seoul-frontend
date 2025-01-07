import { useState } from "react";
import MapHeader from "../components/MapHeader";
import MapWebNav from "../components/MapWebNav";
import NaverMap from "../components/NaverMap";
import Sidebar from "../components/Sidebar";

function Map() {
  // 현재 위치 표시 여부
  const [showCurrentLocation, setShowCurrentLocation] = useState(false);

  // 내 위치 버튼이 눌렸을 때 상태 변경
  const handleToggleLocation = (isActive) => {
    setShowCurrentLocation(isActive);
  };

  return (
    <>
      <NaverMap showCurrentLocation={showCurrentLocation}/>
      <Sidebar />
      <MapHeader onToggleLocation={handleToggleLocation}/>
      <MapWebNav />
    </>
  )
}

export default Map;