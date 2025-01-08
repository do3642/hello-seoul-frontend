import React from 'react';
import './css/Navigation.css';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Navigation = ({ contentName, link }) => {
    const { t } = useTranslation();
    const navItems = t('nav', { returnObjects: true })[0];
    const navigate = useNavigate();

    const handleNavigation = (path) => {
      navigate(path);  // 해당 경로로 이동
    };
  return (
    <nav className="navigation">
      <ul>
        <li onClick={() => handleNavigation('/map')}>
          <p>{navItems.navMap} <i className="fa-solid fa-map"></i></p>
          <span>{navItems.page}<i className="fa-solid fa-caret-right"></i></span>
        </li>
        <li onClick={() => handleNavigation('/subway')}>
          <p>{navItems.subway} <i className="fa-solid fa-train-subway"></i></p>
          <span>{navItems.page}<i className="fa-solid fa-caret-right"></i></span>
        </li>
        <li>
          <p>{navItems.whereToGo} <i className="fa-solid fa-star"></i></p>
          <span>{navItems.page}<i className="fa-solid fa-caret-right"></i></span>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
