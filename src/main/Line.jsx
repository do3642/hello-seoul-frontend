import React, { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import Subway from '../../subway.svg?react';
import './Line.css';

const Line = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  // 화면 크기 변경 시, 크기 갱신
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleElementClick = (event) => {
    // 클릭한 요소가 tspan인 경우 텍스트값 출력
    if (event.target.tagName === 'tspan') {
      console.log('클릭한 텍스트:', event.target.textContent);
    }
    // 클릭한 요소가 circle인 경우, 해당 역 이름 출력
    if (event.target.tagName === 'circle') {
      console.log('클릭한 역: ', event.target.getAttribute('data-station-name'));
    }
  };
  
  return (
    <div id="Line" style={{ width: '100%', height: '100vh' }}>
      <TransformWrapper
        initialScale={1}
        minScale={1}
        maxScale={5}
        disabled={false}
        wheel={{ disabled: false, step: 0.1 }}
        pan={{ disabled: false }}
      >
        <TransformComponent>
          <svg
            width="100vw"
            height="100vh"
            viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
            onClick={handleElementClick} 
          >
            <Subway />
          </svg>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};

export default Line;
