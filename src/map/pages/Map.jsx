import Location from "../components/Location";
import MapHeader from "../components/MapHeader";
import MapNavWeb from "../components/MapNavWeb";
import NaverMap from "../components/NaverMap";
import Sidebar from "../components/Sidebar";

function Map() {

  return (
    <>
      <NaverMap />
      <Sidebar />
      <MapHeader />
      <MapNavWeb />
    </>
  )
}

export default Map;