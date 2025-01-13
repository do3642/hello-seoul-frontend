import React from 'react';
import './css/Card.css';

function Card({ type, guName,guname,date, title, addr1, firstimage,main_img}) {
  if(firstimage === ''){
    firstimage = '/public/img/noimage_l.gif'
  }
  return (
    <div className="spots-content-card">
      <p><img src={type === 'tourist' ? firstimage : main_img} alt={`${type} 이미지`}  /></p>
      <div className="spots-content-card-text">
        <div className="spots-card-districts">{type === 'tourist' ? guName : guname}</div>
        <div className="spots-card-tourist"><span>{title}</span></div>
        <div className="spots-card-info">
          <span>{type === 'tourist' ? '' : '기간 '}</span>
          <span>{type === 'tourist' ? addr1: date}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
