import React from 'react';
import { useNavigate } from 'react-router-dom';


function Card({ type, guName, title, addr1, firstimage,contentid }) {

  const navigate = useNavigate();

  if(firstimage === ''){
    firstimage = '/img/noimage_l.gif'
  }

  const detailpage = () => {
    navigate(`/spots/${contentid}`);
  };



  return (
    <div className="spots-content-card" data-id={contentid} onClick={detailpage}>
      <p><img src={firstimage} alt={`${title} 이미지`}  /></p>
      <div className="spots-content-card-text">
        <div className="spots-card-districts">{guName}</div>
        <div className="spots-card-tourist"><span>{title}</span></div>
        <div className="spots-card-info">
          <span></span>
          <span>{addr1}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
