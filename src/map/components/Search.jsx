import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';

function Search({ setTouristSpots }) {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    if (event.key === 'Enter' || event.type === 'submit') {
      event.preventDefault();

      if (searchQuery.trim() === '') return; // 빈 검색어 방지

      // URL 갱신
      navigate(`/map/search?query=${searchQuery}`);
      // 서버에서 검색어에 맞는 데이터를 받아옵니다.
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/mapSearch?query=${searchQuery}`);
      const data = await response.json();

      // touristSpots만 갱신
      setTouristSpots(data);
      console.log(data);
    }
  };

  return (
    <div className="search">
      <div className="search-container">
        <input 
          type="search" 
          id="search" 
          value={searchQuery} 
          onChange={handleSearchChange} 
          onKeyDown={handleSearchSubmit} 
          placeholder="검색어를 입력하세요"
        />
        <FontAwesomeIcon 
          icon={faMagnifyingGlass} 
          className="search-icon" 
          onClick={handleSearchSubmit} 
        />
      </div>
    </div>
  );
}

export default Search;
