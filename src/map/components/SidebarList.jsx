import React from "react";
import '../styles/SidebarList.css';

function SidebarList({ spot, onClick }) {

  return (
    <div className="sidebar-list" data-lon={spot.mapx} data-lat={spot.mapy} onClick={onClick}>
      <div className="sidebar-list-left">
        <h4>{spot.guName}</h4>
        <br />
        <p>{spot.title}</p>
        <p>{spot.tel}</p>
      </div>
      <div className="sidebar-list-right">
        <img src={spot.firstimage2} alt="관광지 이미지" />
      </div>
    </div>
  );
}

export default SidebarList;
