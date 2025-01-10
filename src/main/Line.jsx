import { useRef, useState, useEffect } from 'react';
import Subway from '../../subway.svg?react';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import './Line.css';

const Line = () => {
  const viewerRef = useRef(null);
  const svgRef = useRef(null); // SVG 요소에 접근하기 위한 ref
  const [tool, setTool] = useState("auto");
  const [value, setValue] = useState(null);
  const [selectedStation, setSelectedStation] = useState(null); // 선택된 역 정보

  // 역 클릭 핸들러
  const handleStationClick = (stationName, x, y) => {
    setSelectedStation({ name: stationName, x, y });
  };

  // SVG DOM 접근 및 이벤트 바인딩
  useEffect(() => {
    if (svgRef.current) {
      // 모든 역(circle)을 선택
      const stations = svgRef.current.querySelectorAll('circle'); // circle로 정의된 역
      stations.forEach((station) => {
        // 역 이름을 ID로 사용한다고 가정
        const stationName = station.getAttribute('id') || 'Unknown Station';
        const x = station.getAttribute('cx');
        const y = station.getAttribute('cy');

        station.addEventListener('click', () => handleStationClick(stationName, x, y));
        station.style.cursor = 'pointer'; // 마우스 커서를 클릭 가능하게 설정
      });
    }
  }, []);

  return (
    <div id='Line' style={{ width: "100%", height: "80vh" }}>
      <ReactSVGPanZoom
        width={'100vw'}
        height={'100vh'}
        ref={viewerRef}
        tool={tool}
        value={value}
        detectWheel={true} // wheel 확대축소 기능
        onChangeValue={setValue}
        onChangeTool={setTool}
        scaleFactorOnWheel={2} // wheel 확대축소 속도 조절
      >
        <svg ref={svgRef} width="100%" height="100%">
          <Subway />
        </svg>
      </ReactSVGPanZoom>

      {/* 선택된 역에 대한 네비게이션 버튼 */}
      {selectedStation && (
        <div
          className="station-nav"
          style={{
            position: "absolute",
            top: `${selectedStation.y}px`,
            left: `${selectedStation.x}px`,
            transform: "translate(-50%, -50%)",
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)"
          }}
        >
          <p>{selectedStation.name}</p>
          <button onClick={() => alert(`${selectedStation.name}로 길찾기!`)}>길찾기</button>
          <button onClick={() => setSelectedStation(null)}>닫기</button>
        </div>
      )}
    </div>
  );
};

export default Line;