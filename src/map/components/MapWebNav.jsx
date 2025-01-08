import { useNavigate } from 'react-router-dom';
import '../styles/MapWebNav.css'

function MapWebNav() {

  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const handleNavigation = (path) => {
    navigate(path); // 페이지 이동
  };
  return (
    <div className="map-web-nav-container">
      <ul className="map-web-nav">
      <li className="nav-item home" onClick={() => handleNavigation('/')}>
          <i className="fas fa-home"></i> {/* 홈 아이콘 */}
          <span className="nav-text">안녕, 서울</span>
        </li>
        <li className="nav-item subway" onClick={() => handleNavigation('/subway')}>
          <i className="fas fa-subway"></i> {/* 지하철 아이콘 */}
          <span className="nav-text">지하철</span>
        </li>
        <li className="nav-item star" onClick={() => handleNavigation('/star')}>
          <i className="fas fa-star"></i> {/* 별 아이콘 */}
          <span className="nav-text">어디갈까?</span>
        </li>
      </ul>
    </div>
  )
}

export default MapWebNav;