import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './css/SpotsDetail.css';

function SpotsDetail() {
  const { contentid } = useParams(); // URL에서 contentid 가져오기
  const [spotDetails, setSpotDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 관광지 상세 정보 fetch 함수
  const fetchSpotDetails = async () => {
    if (spotDetails) return;
    try {
      const response = await axios.get(`http://localhost:8888/api/tourist-detail/${contentid}`);
      console.log(response.data);  // 여기에 콘솔 찍기
      setSpotDetails(response.data); // 데이터를 state에 저장
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchSpotDetails(); // 컴포넌트가 마운트될 때 상세 정보 불러오기
  }, []);

  if (loading) {
    return <div>로딩 중...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (
    !spotDetails || 
    !spotDetails.touristSpot || 
    !spotDetails.touristDate || 
    Object.values(spotDetails.touristSpot).every(value => value === null || value === 0 || value === '') || 
    Object.values(spotDetails.touristDate).every(value => value === null || value === 0 || value === '')
  ) {
    return <div className='spots-no-results'>상세 정보가 없습니다.</div>;
  }
  
   // contenttypeid 매핑
   const contentTypeMap = {
    12: '관광지',
    14: '문화시설',
    15: '행사/공연/축제',
    25: '여행코스',
    28: '레포츠',
    32: '숙박',
    38: '쇼핑',
    39: '음식점',
    76: 'tourist',
    78: 'cultural',
    85: 'event',
    75: 'Leports',
    80: 'Accommodation',
    79: 'Shopping',
    82: 'Restaurant',
    77: 'traffic',
  };

  const contentType = contentTypeMap[spotDetails.touristSpot.contenttypeid] || '알 수 없음';

  return (
    <div className="spots-detail-container">
      <button onClick={() => window.history.back()}>
        <i className="fas fa-chevron-left"></i> 뒤로가기
      </button>
      <h2>{spotDetails.touristSpot.title}</h2>

      <div className="spots-detail-content">
        <div className="spots-detail-image">
          <img src={spotDetails.touristSpot.firstimage || '/img/noimage_l.gif'} alt={spotDetails.touristSpot.title} />
        </div>
        <div className="spots-detail-info">
          <h3>{contentType}</h3>
          <p>{spotDetails.touristSpot.guName}</p>
          <p>{spotDetails.touristSpot.addr1}</p>
          <p>{spotDetails.touristSpot.tel}</p>

          {/* touristDate 정보 추가 */}
          {spotDetails.touristDate.eventstartdate && spotDetails.touristDate.eventenddate && (
            <div>
              <p><strong>이벤트 기간:</strong> {spotDetails.touristDate.eventstartdate} - {spotDetails.touristDate.eventenddate}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );

}

export default SpotsDetail;
