import React from 'react';
import './css/Card.css';

function Card({ type, district, name, additionalInfo, imageUrl }) {
  return (
    <div className="spots-content-card">
      <p><img src={imageUrl} alt={`${type} 이미지`}  /></p>
      <div className="spots-content-card-text">
        <div className="spots-card-districts">{district}</div>
        <div className="spots-card-tourist"><span>{name}</span></div>
        <div className="spots-card-info">
          <span>{type === 'tourist' ? '' : '기간 '}</span>
          <span>{additionalInfo}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
