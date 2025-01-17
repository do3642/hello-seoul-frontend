import React from 'react';
import { useNavigate } from 'react-router-dom';


function ImgCard({ spot }) {
    const navigate = useNavigate();
  
  if(spot.firstimage === ''){
    spot.firstimage = '/img/noimage_l.gif'
  }

  const detailpage = () => {
    navigate(`/spots/${spot.contentid}`);
  };

  return (
    <div className="spots-img-card" data-id={spot.contentid} onClick={detailpage}>
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