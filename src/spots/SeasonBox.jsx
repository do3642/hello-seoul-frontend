import { useEffect, useState } from "react";
import ImgCard from "./ImgCard";
import axios from "axios";
import { useTranslation } from "react-i18next";
import getLanguageCode from '../utils/getLanguageCode';

function SeasonBox({ seasonName, seasonNameKR }){
  const { t, i18n } = useTranslation();
  const [spots, setSpots] = useState([]);

  const [animate, setAnimate] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false); // 애니메이션이 진행 중인지 여부
  
 // 각 계절에 맞는 데이터 요청 함수
 const fetchSeasonData = (seasonKR) => {

  axios
    .get(`http://localhost:8888/api/season-spots`, { // 서버 주소는 나중에 바꾸기
      params: {
        seasonKR: seasonNameKR, // 계절 한글 이름
      }
    })
    .then((response) => {
      setSpots(response.data); // 데이터를 state에 저장
    })
    .catch((error) => console.error('Error fetching data:', error));
};

useEffect(() => {
  fetchSeasonData(seasonNameKR); // 컴포넌트가 마운트될 때 데이터 요청
}, [seasonNameKR]);

  const handleButtonClick = () => {
    if (isAnimating) return; // 애니메이션 진행 중이면 클릭 무시

    setAnimate(true);
    setIsAnimating(true);
    fetchSeasonData(seasonNameKR);

    setTimeout(() => {
      setAnimate(false);
      setIsAnimating(false); // 애니메이션이 끝나면 상태 리셋
    }, 1000); // 애니메이션 지속 시간 1초
  };


  return (
    <div className={`${seasonName}-box`}>
      <div className="spots-season-top">
        <h2>{seasonNameKR}</h2>
        <button 
          className={`${seasonName}-btn ${animate ? 'season-ani' : ''}`}
          onClick={handleButtonClick}
          >
            재추천
        </button>
      </div>

      <div className={`${seasonName.toLowerCase()}-img-cards`}>
        {spots.map((spot, index) => (
          <ImgCard key={index} spot={spot} /> // ImgCard에 spot 데이터를 전달
        ))}
      </div>

    </div>
  );
}

export default SeasonBox;
