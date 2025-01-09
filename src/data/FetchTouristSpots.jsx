import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const FetchTouristSpots = () => {
  const [districtStatus, setDistrictStatus] = useState("idle"); // 지역 데이터 상태 관리
  const [touristStatus, setTouristStatus] = useState("idle"); // 관광 데이터 상태 관리
  const [districtMessage, setDistrictMessage] = useState(""); // 지역 데이터 상태 메시지
  const [touristMessage, setTouristMessage] = useState(""); // 관광 데이터 상태 메시지
  const navigate = useNavigate();

  // 지역 데이터 저장
  const saveDistricts = async () => {
    setDistrictStatus("saving");
    setDistrictMessage("지역 데이터를 저장 중입니다...");

    try {
      const districtResponse = await fetch("http://localhost:8888/api/districts", { method: "POST" });
      if (!districtResponse.ok) throw new Error("지역 데이터 저장 실패");
      setDistrictStatus("completed");
      setDistrictMessage("지역 데이터 저장 완료!");
    } catch (error) {
      setDistrictStatus("error");
      setDistrictMessage("지역 데이터 저장 중 오류가 발생했습니다.");
    }
  };

  // 관광 데이터 저장
  const saveTouristSpots = async () => {
    setTouristStatus("saving");
    setTouristMessage("관광 데이터를 저장 중입니다...");

    try {
      const touristResponse = await fetch("http://localhost:8888/api/touristspot", { method: "POST" });
      if (!touristResponse.ok) throw new Error("관광 데이터 저장 실패");
      setTouristStatus("completed");
      setTouristMessage("관광 데이터 저장 완료!");
    } catch (error) {
      setTouristStatus("error");
      setTouristMessage("관광 데이터 저장 완료!");
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
        <button onClick={saveDistricts} disabled={districtStatus === "saving"}>
          지역 데이터 저장
        </button>
      </div>
      <div style={{ marginBottom: "20px" }}>
        <p>{touristMessage}</p>
        <button onClick={saveTouristSpots} disabled={touristStatus === "saving"}>
          관광 데이터 저장
        </button>
      </div>
      {(districtStatus === "completed" || touristStatus === "completed" || touristStatus === "error") && (
        <button onClick={goHome} style={{ marginTop: "20px" }}>
          홈으로 돌아가기
        </button>
      )}
    </div>
  );
};

export default FetchTouristSpots;