import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";


function SpotsAllTourist() {
  const { t, i18n } = useTranslation();
  const [touristSpots, setTouristSpots] = useState([]);
  const [excludeIds, setExcludeIds] = useState([]); 

  // 무한스크롤
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    const languageCode = i18n.language;
    // const replaceLang = getLanguageCode(languageCode);
    try {
      setLoading(true);
      // 관광지 데이터 요청 (페이지 번호 추가)
      const response = await axios.get(`http://localhost:8888/api/tourist-spots`, {
        params: {
          lang: languageCode,
          page: page,
          size: 8,
          excludeIds: excludeIds.join(',')  // 이미 받은 ID들을 제외한 데이터만 요청
        }
      });
      // 데이터가 있으면 추가, 없으면 hasMore를 false로 설정
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        const newSpots = response.data.filter(spot => !excludeIds.includes(spot.id));
        
        // 새로운 관광지만 touristSpots 상태에 추가
        setTouristSpots(prevSpots => [...prevSpots, ...newSpots]);

        // 새로 받은 관광지 ID들을 excludeIds 배열에 추가
        setExcludeIds(prevIds => [...prevIds, ...newSpots.map(spot => spot.id)]);

        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching tourist spots:', error);
    } finally {
      setLoading(false);
    }

  };

  // 컴포넌트 마운트 시 첫 번째 데이터 로딩
  useEffect(() => {
    setTouristSpots([]); // 기존 데이터 날리기
    setExcludeIds([]); // excludeIds 초기화
    setPage(0); // 페이지 초기화
    fetchData();
  }, [i18n.language]);


  return (
    <div className="all-tourist">
      <div className="spots-content-top">
        <h2>{t('spots.allSpots')}</h2>
      </div>

      <InfiniteScroll
        dataLength={touristSpots.length} // 현재 로드된 데이터 개수
        next={fetchData} // 스크롤할 때마다 호출되는 함수
        hasMore={hasMore} // 더 이상 데이터가 없을 경우
        loader={<h4>Loading...</h4>} // 로딩 중 표시
        endMessage={<p className="load-all-data">모든 항목을 확인하셨습니다!</p>} // 데이터 끝에 도달했을 때 메시지
      >
        <div className="spots-content-cards spots-all-tourist">
          {touristSpots.map((spot, index) => (
            <Card key={index} type="tourist" {...spot} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default SpotsAllTourist;
