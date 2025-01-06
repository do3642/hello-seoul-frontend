import React from 'react';
import Station from './Station';

function Line({ lineNum, stations }) {
  const path = stations.map((station, index) => {
    const x = (index + 1) * 50; // 간단한 좌표 계산 (추후 보완 필요)
    const y = 100 + Math.random() * 200; // Y축 랜덤 배치
    station.x = x;
    station.y = y;
    return `${x},${y}`;
  }).join(' L ');

  return (
    <g>
      <path d={`M ${path}`} stroke="blue" fill="none" />
      {stations.map((station) => (
        <Station key={station.station_cd} station={station} />
      ))}
    </g>
  );
}

export default Line;