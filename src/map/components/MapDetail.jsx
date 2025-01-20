import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSVG from '../../utils/loadingSVG';
import '../styles/MapDetail.css'
import { closeAllInfoWindows } from '../../utils/createMarkersForDistrict'

function MapDetail() {
  const { contentid } = useParams();
  const [mapDetails, setMapDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useNavigate 훅 사용
  const navigate = useNavigate();

  // 데이터 조회 함수
  const fetchMapDetails = async () => {
    setLoading(true); // 데이터 요청 시작 시 로딩 상태로 설정
    try {
      const response = await axios.get(`http://localhost:8888/api/tourist-detail/${contentid}`);

      if (!response.data || Object.keys(response.data).length === 0) {
        // 데이터가 없을 경우
        setMapDetails(null);
      } else {
        setMapDetails(response.data);
      }
    } catch (e) {
      // API 호출 에러 처리
      setError(e);
      setMapDetails(null); // 오류가 나면 데이터가 없다고 처리
    }
    setLoading(false); // 데이터 로딩 완료
  };

  // useEffect에서 contentid 변경 시마다 fetchMapDetails 호출
  useEffect(() => {
    fetchMapDetails();
  }, [contentid]);

  // 로딩 중에는 LoadingSVG를 표시
  if (loading) {
    return <div><LoadingSVG /></div>;
  }

  // 오류가 있거나 데이터가 없을 경우
  if (error || mapDetails === null || mapDetails.touristSpot === null) {
    return (
      <div>
        <h3>잘못된 주소로 접근하셨습니다.</h3>
        <button onClick={() => navigate('/map')}>뒤로가기</button> {/* 뒤로가기 버튼 */}
      </div>
    );
  }

  // 정상적으로 데이터가 있으면 표시
  return (
    <div className="map-detail">
      <button onClick={() => {
        closeAllInfoWindows();
        navigate('/map');
      }
      }>
        <i className="fas fa-chevron-left" style={{ marginRight: "8px" }}></i>
        뒤로가기
      </button>

      <div className="map-detail-img">
        <img src={mapDetails.touristSpot?.firstimage2 || "/public/img/noimage_l.gif"} alt="" />
      </div>

      <h3>{mapDetails.touristSpot.title}</h3>
      {mapDetails.touristSpot.addr1 && <p>{mapDetails.touristSpot.addr1}</p>}
      {mapDetails.touristSpot.tel && <p>{mapDetails.touristSpot.tel}</p>}
      <button onClick={() => navigate(`/spots/${contentid}`)}>상세보기</button>

    </div>
  );
}

export default MapDetail;
