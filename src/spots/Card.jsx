import React from 'react';
import './css/Card.css';

function Card({ type, guName,date, title, addr1, firstimage}) {
  if(firstimage === ''){
    firstimage = '/public/img/noimage_l.gif'
  }
  return (
    <div className="spots-content-card">
      <p><img src={firstimage} alt={`${type} 이미지`}  /></p>
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
