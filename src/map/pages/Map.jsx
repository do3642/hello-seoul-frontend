import MapHeader from "../components/MapHeader";
import MapWebNav from "../components/MapWebNav";
import NaverMap from "../components/NaverMap";
import Sidebar from "../components/Sidebar";

function Map() {

  return (
    <>
      <NaverMap />
      <Sidebar />
      <MapHeader />
      <MapWebNav />
    </>
  )
}

export default Map;