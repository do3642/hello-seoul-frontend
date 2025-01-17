import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from './Card';

function SpotsSearch() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get('search');  // 쿼리 파라미터에서 검색어 가져오기
  const [filteredSpots, setFilteredSpots] = useState([]);

  const fetchSearchResults = async () => {
    const searchTerm = searchQuery;  // `searchQuery`는 전달된 검색어
    try {
      const response = await fetch(`http://localhost:8888/api/search?search=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('서버 오류가 발생했습니다. 다시 시도해주세요.');
      }
  
      const data = await response.json();
      setFilteredSpots(data);

    } catch (error) {
      console.error('서버 요청에 오류발생:', error);
    }
  };

  useEffect(() => {
    fetchSearchResults();
  }, [searchQuery]);
  

  return (
    <div className='spots-search-container'>
      <h2>검색 결과</h2>
      <div className='spots-content-cards'>
        {filteredSpots.length > 0 ? (
          filteredSpots.map(spot => (
            <Card key={spot.id} {...spot} />
          ))
        ) : (
          <div className='spots-no-results'>
            <p><strong>"{searchQuery}"</strong> 에 대한 검색 내용이 없습니다.</p>
            <p>찾으시는 내용을 다시 검색해주세요.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SpotsSearch;
