import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function SpotsDetail() {
  const { contentid } = useParams(); // URL에서 contentid 가져오기
  const [spotDetails, setSpotDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  
  // 관광지 상세 정보 fetch 함수
  const fetchSpotDetails = async () => {
    if (spotDetails) return;
    try {
      console.log("요청횟수확인");
      const response = await axios.get(`http://localhost:8888/api/tourist-detail/${contentid}`);
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
    Object.values(spotDetails).every(value => value === null || value === 0 || value === '')
  ) {
    return <div>상세 정보가 없습니다.</div>;
  }

  return (
    <div className="spots-detail-container">
      <button onClick={() => window.history.back()}>뒤로가기</button>
      <h2>{spotDetails.title}</h2>
      <div className="spots-detail-image">
        <img src={spotDetails.firstimage || '/img/noimage_l.gif'} alt={spotDetails.title} />
      </div>
      <div className="spots-detail-info">
        <p><strong>구역:</strong> {spotDetails.guName}</p>
        <p><strong>주소:</strong> {spotDetails.addr1}</p>
        <p><strong>설명:</strong> {spotDetails.overview || '설명이 없습니다.'}</p>
      </div>
    </div>
  );
}

export default SpotsDetail;
