import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const TouristSpotsContext = createContext();

export const TouristSpotsProvider = ({ children }) => {
  const [touristSpots, setTouristSpots] = useState([]); // 페이지네이션 된 데이터
  const [allTouristSpots, setAllTouristSpots] = useState([]); // 전체 관광지 데이터
  const [groupedSpots, setGroupedSpots] = useState({}); // 그룹화된 데이터 상태 추가
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지
  const [selectedLanguage, setSelectedLanguage] = useState("kor"); // 선택된 언어
  const [totalPages, setTotalPages] = useState(1); // 전체 페이지 수
  const [searchKeyword, setSearchKeyword] = useState(null); // 검색어

  // 전체 관광지 데이터 가져오기
  useEffect(() => {
    const fetchAllTouristSpots = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_SERVER_URL}/api/alltouristspotdata?languageCode=${selectedLanguage}`
        );
        const data = await response.json();

        setAllTouristSpots(data);

        // 데이터를 그룹화하여 저장 (별도의 상태)
        const grouped = data.reduce((acc, spot) => {
          if (!acc[spot.guName]) acc[spot.guName] = [];
          acc[spot.guName].push(spot);
          return acc;
        }, {});

        setGroupedSpots(grouped);
      } catch (error) {
        console.error("Failed to fetch all tourist spots: ", error);
      }
    };

    fetchAllTouristSpots();
    console.log('컨텍스트.jsx의 turistSpots',touristSpots)

  }, [selectedLanguage]);
  
  useEffect(() => {
    fetchTouristSpots();
  }, [currentPage, searchKeyword, selectedLanguage])

  // 페이지네이션된 관광지 데이터 가져오기
  const fetchTouristSpots = async () => {
    try {
      let URL = `${import.meta.env.VITE_SERVER_URL}/api/touristspotdata?languageCode=${selectedLanguage}&page=${currentPage}&pagesize=10`

      if(searchKeyword)
        URL = `${import.meta.env.VITE_SERVER_URL}/api/mapSearch?languageCode=${selectedLanguage}&query=${searchKeyword}&page=${currentPage}&size=10`

      const response = await fetch(URL);
      const data = await response.json();
      setTouristSpots(data.content); // 페이지네이션된 데이터
      setTotalPages(data.totalPages); // 전체 페이지 수
    } catch (error) {
      console.error("Failed to fetch tourist spots: ", error);
    }
  };

  return (
    <TouristSpotsContext.Provider
      value={{
        touristSpots, // 페이지네이션된 데이터
        allTouristSpots, // 전체 데이터(페이지네이션 x)
        groupedSpots, // 그룹화된 데이터
        currentPage,
        setCurrentPage,
        selectedLanguage,
        setSelectedLanguage,
        totalPages,
        setTotalPages,
        setTouristSpots,
        setSearchKeyword
      }}
    >
      {children}
    </TouristSpotsContext.Provider>
  );
};

export const TouristSpots = () => {
  const context = useContext(TouristSpotsContext);
  if (!context) {
    throw new Error("useTouristSpots must be used within a TouristSpotsProvider");
  }

  return context;
};
