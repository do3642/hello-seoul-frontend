import React from 'react';
import './css/Navigation.css';
import { useTranslation } from 'react-i18next';

const Navigation = ({ contentName, link }) => {
    const { t } = useTranslation();
    const navItems = t('nav', { returnObjects: true })[0];

  return (
    <nav className="navigation">
      <ul>
        <li>
          <p>{navItems.navMap} <i className="fa-solid fa-map"></i></p>
          <span>{navItems.page}<i className="fa-solid fa-caret-right"></i></span>
        </li>
        <li>
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
