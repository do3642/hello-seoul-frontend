import React from 'react';
import './css/ImgCard.css';

function ImgCard({ spot }) {
  if(spot.firstimage === ''){
    spot.firstimage = '/img/noimage_l.gif'
  }
  return (
    <div className="spots-img-card">
      <figure>
        <p><img src={spot.firstimage} alt={spot.title} /></p>
        <figcaption>
          <p>{spot.guName}</p>
          <p>{spot.title}</p>
          </figcaption>
      </figure>
    </div>
  );
}

export default ImgCard;