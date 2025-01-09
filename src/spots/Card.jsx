import React from 'react';

function Card({ type, district, name, additionalInfo }) {
  return (
    <div className="spots-content-card">
      <p><img src="" alt={`${type} 이미지`} style={{ width: '100%', height: '200px', backgroundColor: '#ccc' }} /></p>
      <div className="spots-content-card-text">
        <div className="spots-card-districts">{district}</div>
        <div className="spots-card-tourist">
          <span>{type === 'tourist' ? '관광지 이름' : '축제 이름'}</span>
          <span>{name}</span>
        </div>
        <div className="spots-card-info">
          <span>{type === 'tourist' ? '전화번호' : '기간'}</span>
          <span>{additionalInfo}</span>
        </div>
      </div>
    </div>
  );
}

export default Card;
