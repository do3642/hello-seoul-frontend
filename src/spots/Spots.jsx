import { useNavigate } from 'react-router-dom';
import './css/Spots.css';
import Card from './Card';  // Card 컴포넌트 import

function Spots() {
  const buttonLabels = ['전체', '계절별', '힐링', '산책', '등산', '전통'];
  const navigate = useNavigate();

  // 경로 이동 함수
  const handleNavigation = (path) => {
    navigate(path);
  };

  // 관광지 데이터 (4개 가정)
  const touristSpots = [
    { district: '송파구', name: '롯데월드', additionalInfo: '02-000-0000' },
    { district: '강남구', name: '스타필드', additionalInfo: '02-111-1111' },
    { district: '중구', name: '남산서울타워', additionalInfo: '02-222-2222' },
    { district: '종로구', name: '경복궁', additionalInfo: '02-333-3333' },
  ];

  // 축제 데이터 (4개 가정)
  const festivals = [
    { district: '광진구', name: '서울 재즈 페스티벌', additionalInfo: '2025-05-01 ~ 2025-05-03' },
    { district: '강남구', name: '서울 봄꽃 축제', additionalInfo: '2025-04-01 ~ 2025-04-07' },
    { district: '동대문구', name: '서울 북촌한옥마을 축제', additionalInfo: '2025-06-01 ~ 2025-06-05' },
    { district: '영등포구', name: '서울 여름 축제', additionalInfo: '2025-07-15 ~ 2025-07-20' },
  ];

  return (
    <div className='spots'>
      <header>
        <h1>안녕,서울</h1>
        <input type="search" name="search" id="spots-search" />
        <ul>
          <li><button onClick={() => handleNavigation('/')}>홈</button></li>
          <li><button onClick={() => handleNavigation('/map')}>지도</button></li>
          <li><button onClick={() => handleNavigation('/subway')}>지하철</button></li>
        </ul>
      </header>

      <section className='spots-container'>
        <div className="spots-menu-box">
          {buttonLabels.map((label, index) => (
            <button key={index}>{label}</button>
          ))}
        </div>

        <article className='spots-content'>
          <div className="spots-content-top">
            <h2>전체 관광지</h2>
            <button>더보기</button>
          </div>
          <div className="spots-content-cards">
            {touristSpots.map((spot, index) => (
              <Card key={index} type="tourist" {...spot} />
            ))}
          </div>

          <div className="spots-content-top">
            <h2>전체 축제</h2>
            <button>더보기</button>
          </div>
          <div className="spots-content-cards">
            {festivals.map((festival, index) => (
              <Card key={index} type="festival" {...festival} />
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default Spots;
