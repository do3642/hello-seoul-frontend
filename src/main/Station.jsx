import React from 'react';

function Station({ station }) {
  const { x, y, station_nm } = station;
  return (
    <g>
      <circle cx={x} cy={y} r="5" fill="red" />
      <text x={x + 10} y={y + 5} fontSize="10">{station_nm}</text>
    </g>
  );
}

export default Station;