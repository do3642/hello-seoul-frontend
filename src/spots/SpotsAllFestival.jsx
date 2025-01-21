import { useTranslation } from "react-i18next";
import getLanguageCode from "../utils/getLanguageCode";
import { useEffect, useState } from "react";
import axios from "axios";
import Card from "./Card";
import InfiniteScroll from "react-infinite-scroll-component";
import loadingSVG from '../utils/loadingSVG'


function SpotsAllFestival() {
  const { t, i18n } = useTranslation();
  const [festivals, setFestivals] = useState([]);
  const [excludeIds, setExcludeIds] = useState([]); 


  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);

  const fetchData = async () => {
    const languageCode = i18n.language;
    // const replaceLang = getLanguageCode(languageCode);

    try {
      setLoading(true);
      // 관광지 데이터 요청 (페이지 번호 추가)
      const response = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/festivals`, {
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
        const newFestival = response.data.filter(festival => !excludeIds.includes(festival.id));

        setFestivals(prevSpots => [...prevSpots, ...newFestival]);

        setExcludeIds(prevIds => [...prevIds, ...newFestival.map(festival => festival.id)]);

        setPage(prevPage => prevPage + 1);
      }
    } catch (error) {
      console.error('Error fetching Festivals:', error);
    } finally {
      setLoading(false);
    }
  };

  // 컴포넌트 마운트 시 첫 번째 데이터 로딩
  useEffect(() => {
    setFestivals([]); // 기존 데이터 날리기
    setExcludeIds([]); // excludeIds 초기화
    setPage(0); // 페이지 초기화
    fetchData();
  }, [i18n.language]);


  return (
    <div className="all-festival">
      <div className="spots-content-top">
        <h2>{t('spots.allFestival')}</h2>
      </div>

      <InfiniteScroll
        dataLength={festivals.length} // 현재 로드된 데이터 개수
        next={fetchData} // 스크롤할 때마다 호출되는 함수
        hasMore={hasMore} // 더 이상 데이터가 없을 경우
        loader={<h4>{loadingSVG()}</h4>} // 로딩 중 표시
        endMessage={<p className="load-all-data">모든 항목을 확인하셨습니다!</p>} // 데이터 끝에 도달했을 때 메시지
      >
        <div className="spots-content-cards spots-all-festival">
          {festivals.map((spot, index) => (
            <Card key={index} type="festival" {...spot} />
          ))}
        </div>
      </InfiniteScroll>
    </div>
  );
}

export default SpotsAllFestival;