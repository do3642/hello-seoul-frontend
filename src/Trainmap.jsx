import React from 'react';
import Line from './Line';

function Trainmap({ data }) {
  return (
    <svg width="800" height="600" style={{ border: '1px solid black' }}>
      {Object.entries(data).map(([lineNum, stations]) => (
        <Line key={lineNum} lineNum={lineNum} stations={stations} />
      ))}
    </svg>
  );
}

export default Trainmap;