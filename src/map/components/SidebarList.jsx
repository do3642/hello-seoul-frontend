import React from "react";
import '../styles/SidebarList.css';
import { useNavigate } from "react-router-dom";

function SidebarList({ spot, onClick, handleDistrictChange }) {

  const navigate = useNavigate();

  const handleClick = () => {
    handleDistrictChange(spot.guName)
    navigate(`/map/${spot.contentid}`);
  };

  if (spot.firstimage2 === '') {
    spot.firstimage2 = '/public/img/noimage_l.gif'
  }

  return (
    <div
      className="sidebar-list"
      data-lon={spot.mapx}
      data-lat={spot.mapy}
      onClick={(event) => {
        onClick(event);
        handleClick();
      }}>
      <div className="sidebar-list-left">
        <h4>{spot.guName}</h4>
        <br />
        <p>{spot.title}</p>
        <p>{spot.tel}</p>
      </div>
      <div className="sidebar-list-right">
        <img src={spot.firstimage2} alt={spot.title} />
      </div>
    </div>
  );
}

export default SidebarList;
