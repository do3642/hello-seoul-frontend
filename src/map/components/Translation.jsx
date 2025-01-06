import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import '../styles/mapHeaderRight.css';

function Translation() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  }

  return (
    <div
      className={`translation ${isActive ? "active" : ""}`}
      onClick={handleClick}
    >
      <FontAwesomeIcon icon={faGlobe} className='translation-icon'/>
    </div>
  )
}

export default Translation;