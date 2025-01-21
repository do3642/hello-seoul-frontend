import React from "react";
import '../styles/TrainsidebarList.css';

function TrainsidebarList({ spot }) {
  return (
    <div className="sidebar-list">
      <div className="sidebar-list-left">
        <h4>{spot.district}</h4>
        <br />
        <p>{spot.touristName}</p>
        <p>{spot.phoneNumber}</p>
      </div>
      <div className="sidebar-list-right">
        <img src={spot.image} alt="관광지 이미지" />
      </div>
    </div>
  );
}

export default TrainsidebarListt;
