import React from 'react';


function Card({ type, guName, title, addr1, firstimage,contentid }) {
  if(firstimage === ''){
    firstimage = '/img/noimage_l.gif'
  }
  return (
    <div className="spots-content-card" data-id={contentid}>
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
