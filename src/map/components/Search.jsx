import '../styles/Search.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';
import { TouristSpots } from '../../context/TouristSpotsContext';

function Search() {
  const { setCurrentPage, selectedLanguage, setSearchKeyword, currentPage } = TouristSpots();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(0);
  };

  const handleSearchSubmit = async () => {
      // URL 갱신
      navigate(`/map/search?languageCode=${selectedLanguage}&query=${searchQuery}&page=0&size=10`);
      setSearchKeyword(searchQuery)
  };

  // 다른 페이지 갔다가 왔을 때 검색창 비워줌.
  useEffect(() => {
    setSearchKeyword(null)
  }, [])

  return (
    <div className="search">
      <div className="search-container">
        <input 
          type="search" 
          id="search" 
          value={searchQuery}
          onChange={handleSearchChange} 
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              handleSearchSubmit();
            }
          }} 
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
