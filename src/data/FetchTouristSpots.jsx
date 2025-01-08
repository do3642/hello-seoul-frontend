import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FetchTouristSpots = () => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // 백엔드 작업 시작
    const fetchTouristSpots = async () => {
      try {
        const response = await fetch('http://localhost:8888/api/fetch-tourist-spots/korea', {
          method: 'GET',
        });

        if (response.ok) {
          setMessage('Tourist spots fetched and saved successfully.');
        } else {
          setMessage('Error fetching tourist spots.');
        }
      } catch (error) {
        setMessage('Error: ' + error.message);
      } finally {
        setLoading(false); // 로딩 완료
      }
    };

    fetchTouristSpots(); // 백엔드 호출
  }, []); // 빈 배열로 컴포넌트 로드 시에만 실행

  // 버튼 클릭 시 메인 페이지로 이동
  const goToHome = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <div>
      <h2>Tourist Spots Auto Fetch</h2>
      {loading ? (
        <p>Loading...</p> // 작업 진행 중 표시
      ) : (
        <div>
          <p>{message}</p>
          {message.includes('successfully') && ( // 성공 메시지에만 버튼 표시
            <button onClick={goToHome}>홈으로</button>
          )}
        </div>
      )}
    </div>
  );
};

export default FetchTouristSpots;
