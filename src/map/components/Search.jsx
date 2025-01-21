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

  // Cleanup function: 페이지 이동 시 검색어 초기화
  useEffect(() => {
    // URL에 query가 없거나 변경될 때마다 검색어를 초기화
    const queryParams = new URLSearchParams(location.search);
    const query = queryParams.get('query');
    
    if (!query) {
      setSearchQuery('');  // 검색어 초기화
      setSearchKeyword(''); // 검색어 상태 초기화
    } else {
      setSearchQuery(query); // URL에 검색어가 있을 경우 해당 검색어를 상태에 설정
    }
  }, [location.search, setSearchKeyword]);


  return (
    <div className="search">
      <div className="search-container">
        <input 
          type="search" 
          id="search" 
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
