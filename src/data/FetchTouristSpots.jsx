import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FetchTouristSpots = () => {
  const [districtStatus, setDistrictStatus] = useState("idle"); // 지역 데이터 상태 관리
  const [touristStatus, setTouristStatus] = useState({}); // 관광 데이터 상태 관리
  const [districtMessage, setDistrictMessage] = useState(""); // 지역 데이터 상태 메시지
  const [touristMessages, setTouristMessages] = useState({}); // 관광 데이터 상태 메시지
  const navigate = useNavigate();

  const languageCodes = [
    { code: "kor", label: "한국어" },
    { code: "eng", label: "영어" },
    { code: "jpn", label: "일본어" },
    { code: "chs", label: "중국어" },
  ];

  // 지역 데이터 저장
  const saveDistricts = async () => {
    setDistrictStatus("saving");
    setDistrictMessage("지역 데이터를 저장 중입니다...");

    try {
      const districtResponse = await fetch("http://localhost:8888/api/districts", {
        method: "POST",
      });
      if (!districtResponse.ok) throw new Error("지역 데이터 저장 실패");
      setDistrictStatus("completed");
      setDistrictMessage("지역 데이터 저장 완료!");
    } catch (error) {
      setDistrictStatus("error");
      setDistrictMessage("지역 데이터 저장 중 오류가 발생했습니다.");
    }
  };

  // 관광 데이터 저장
  const saveTouristSpots = async (languageCode) => {
    setTouristStatus((prev) => ({ ...prev, [languageCode.code]: "saving" }));
    setTouristMessages((prev) => ({
      ...prev,
      [languageCode.code]: `${languageCode.label} 데이터를 저장 중입니다...`,
    }));

    try {
      const touristResponse = await fetch(
        `http://localhost:8888/api/touristspot?languageCode=${languageCode.code}`,
        { method: "POST" }
      );
      if (!touristResponse.ok) throw new Error(`${languageCode} 데이터 저장 실패`);
      setTouristStatus((prev) => ({ ...prev, [languageCode.code]: "completed" }));
      setTouristMessages((prev) => ({
        ...prev,
        [languageCode.code]: `${languageCode.label} 데이터 저장 완료!`,
      }));
    } catch (error) {
      setTouristStatus((prev) => ({ ...prev, [languageCode.code]: "error" }));
      setTouristMessages((prev) => ({
        ...prev,
        [languageCode.code]: `${languageCode.label} 데이터 저장 중 오류가 발생했습니다.`,
      }));
    }
  };

  const goHome = () => {
    navigate("/"); // 메인 페이지로 리디렉션
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>데이터 저장 작업</h1>
      <div style={{ marginBottom: "20px" }}>
        <p>{districtMessage}</p>
        {districtStatus !== "completed" && (
          <button onClick={saveDistricts} disabled={districtStatus === "saving"}>
            지역 데이터 저장
          </button>
        )}
      </div>
      {districtStatus === "completed" && (
        <>
          {languageCodes.map((language) => (
            <div key={language.code} style={{ marginBottom: "20px" }}>
              <p>{touristMessages[language.code]}</p>
              <button
                onClick={() => saveTouristSpots(language)}
                disabled={touristStatus[language.code] === "saving"}
              >
                {language.label} 관광 데이터 저장
              </button>
            </div>
          ))}
        </>
      )}
      {districtStatus === "completed" &&
        Object.values(touristStatus).every((status) => status === "completed") && (
          <button onClick={goHome} style={{ marginTop: "20px" }}>
            홈으로 돌아가기
          </button>
        )}
    </div>
  );
};

export default FetchTouristSpots;
