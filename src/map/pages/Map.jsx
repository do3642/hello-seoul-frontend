import Location from "../components/Location";
import MapHeader from "../components/MapHeader";
import NaverMap from "../components/NaverMap";
import Sidebar from "../components/Sidebar";

function Map() {

  return (
    <>
      <NaverMap />
      <Sidebar />
      <MapHeader />
    </>
  )
}

export default Map;