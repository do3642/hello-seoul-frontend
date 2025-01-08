import React from 'react';
import Line from './Line';
import data from '../../서울교통공사 노선별 지하철역 정보.json'


function Trainmap() {

  const groupData = data.DATA.reduce((acc, curr) => {
    if (!acc[curr.line_num]) acc[curr.line_num] = [];
    acc[curr.line_num].push(curr);
    return acc;
  }, {});

  return (
    <svg width="1000" height="800" style={{ border: '1px solid black' }}>
      {/* {
        data.DATA.map((value, index) => {
          return (
            <Line key={index} lineNum={value.line_num} stations={value.station_nm} />
          )
        })
      } */}
      {Object.entries(groupData).map(([lineNum, stations]) => (
        <Line key={lineNum} lineNum={lineNum} stations={stations} />
      ))}
    </svg>
  );
}

export default Trainmap;