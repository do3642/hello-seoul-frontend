import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function SpotsDetail() {
  const { contentid } = useParams(); // URL에서 contentid 가져오기
  const [spotDetails, setSpotDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFullHeight, setIsFullHeight] = useState(false); // 이미지 높이 상태

  // 관광지 상세 정보 fetch 함수
  const fetchSpotDetails = async () => {
    if (spotDetails) return;
    try {
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/tourist-detail/${contentid}`);
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
    return <div>{error.message}</div>; // 에러 메시지 표시
  }

  // touristSpot이 null인 경우 처리
  if (spotDetails && spotDetails.touristSpot === null) {
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

  // 날짜 포맷 함수
  const formatDate = (dateString) => {
    if (!dateString || dateString.length !== 8) {
      return '유효하지 않은 날짜';
    }

    // YYYYMMDD 문자열을 Date 객체로 변환
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    const date = new Date(`${year}-${month}-${day}`);
    if (isNaN(date)) {
      return '유효하지 않은 날짜';
    }

    // 원하는 형식으로 출력
    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일`;
  };
  // 날짜 상태 판단 함수
  const eventStatus = (startDate, endDate) => {
    const today = new Date();
    const start = new Date(`${startDate.slice(0, 4)}-${startDate.slice(4, 6)}-${startDate.slice(6, 8)}`);
    const end = new Date(`${endDate.slice(0, 4)}-${endDate.slice(4, 6)}-${endDate.slice(6, 8)}`);

    if (today < start) {
      return '진행전';
    } else if (today >= start && today <= end) {
      return '진행중';
    } else {
      return '진행종료';
    }
  };
  const getEventStatusClass = (status) => {
    if (status === '진행전') return 'spots-event-status-pre';
    if (status === '진행중') return 'spots-event-status-progress';
    if (status === '진행종료') return 'spots-event-status-end';
    return '';
  };

  const toggleImageHeight = () => {
    setIsFullHeight(prev => !prev); // 높이 전환
  };


  return (
    <div className="spots-detail-container">
      <button onClick={() => window.history.back()}>
        <i className="fas fa-chevron-left"></i> 뒤로가기
      </button>
      <h2>{spotDetails.touristSpot.title}</h2>

      <div className="spots-detail-content">
        <div className={`spots-detail-image ${isFullHeight ? 'full-height' : ''}`}>
          <img src={spotDetails.touristSpot.firstimage || '/img/noimage_l.gif'} alt={spotDetails.touristSpot.title} />
          <button className="toggle-height-button" onClick={toggleImageHeight}>
          이미지 토글 버튼
          </button>
        </div>
        <div className="spots-detail-info">
          <h3 className='spots-category-title'>카테고리</h3>
          <div className='spots-category'>{contentType}</div>

          {spotDetails.touristSpot.addr1 !== '' ?
            <div className="spots-addr">
              <h4 className='spots-addr-title'>주소</h4>
              <p className='spots-guname'>{spotDetails.touristSpot.guName}</p>
              <p className='spots-addr-content'>{spotDetails.touristSpot.addr1}</p>
            </div> : ''

          }
          {spotDetails.touristSpot.tel !== '' ?
            <div className="spots-tel">
              <h4 className='spots-tel-title'>연락처</h4>
              <p className='spots-tel-content'>{spotDetails.touristSpot.tel}</p>
            </div> : ''
          }
          {/* 수정된 touristDate 정보 추가 */}
          {spotDetails.touristDate && spotDetails.touristDate.eventstartdate && spotDetails.touristDate.eventenddate && (
            <div className='spots-event'>
              <h4 className='spots-event-title'>이벤트 기간</h4>
              <p className='spots-event-content'>
                {`${formatDate(spotDetails.touristDate.eventstartdate)} ~ ${formatDate(spotDetails.touristDate.eventenddate)}`}
              </p>
              <p className={`spots-event-status ${getEventStatusClass(eventStatus(spotDetails.touristDate.eventstartdate, spotDetails.touristDate.eventenddate))}`}>
                {eventStatus(spotDetails.touristDate.eventstartdate, spotDetails.touristDate.eventenddate)}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SpotsDetail;
