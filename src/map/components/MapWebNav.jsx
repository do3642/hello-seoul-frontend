import { useNavigate } from 'react-router-dom';
import '../styles/MapWebNav.css'
import { useTranslation } from 'react-i18next';

function MapWebNav() {
  const { t } = useTranslation();
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수 가져오기
  const handleNavigation = (path) => {
    navigate(path); // 페이지 이동
  };
  return (
    <div className="map-web-nav-container">
      <ul className="map-web-nav">
      <li className="nav-item home" onClick={() => handleNavigation('/')}>
          <i className="fas fa-home"></i> {/* 홈 아이콘 */}
          <span className="nav-text">{t('logo')}</span>
        </li>
        <li className="nav-item subway" onClick={() => handleNavigation('/subway')}>
          <i className="fas fa-subway"></i> {/* 지하철 아이콘 */}
          <span className="nav-text">{t('nav.0.subway')}</span>
        </li>
        <li className="nav-item spots" onClick={() => handleNavigation('/spots')}>
          <i className="fas fa-star"></i> {/* 별 아이콘 */}
          <span className="nav-text">{t('nav.0.whereToGo')}</span>
        </li>
      </ul>
    </div>
  )
}

export default MapWebNav;