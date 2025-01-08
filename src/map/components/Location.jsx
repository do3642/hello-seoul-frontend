import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import '../styles/mapHeaderRight.css';

function Location ({ onToggleLocation }) {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    const newState = !isActive;
    setIsActive(newState);
    onToggleLocation(newState);
  };

  return (
    <div
     className={`location ${isActive ? "active" : ""}`}
     onClick={handleClick}
    >
      <FontAwesomeIcon icon={faLocationArrow} className='location-icon'/>
    </div>
  )
}

export default Location;