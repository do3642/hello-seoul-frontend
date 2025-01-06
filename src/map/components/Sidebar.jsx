import Search from "./Search";
import '../styles/Sidebar.css';
import SidebarList from "./SidebarList";
import Weather from "./Weather";

function Sidebar() {

  return (
    <div className="side-bar">
      <Search /> 
      <Weather />
      <SidebarList /> 
    </div>
  )
}

export default Sidebar;