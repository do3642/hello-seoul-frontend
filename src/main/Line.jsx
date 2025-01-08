import { useRef, useState } from 'react';
import Subway from '../../subway.svg?react';
import { ReactSVGPanZoom } from 'react-svg-pan-zoom';
import './Line.css';

const Line = () => {
  const viewerRef = useRef(null);
  const [tool, setTool] = useState("auto");
  const [value, setValue] = useState(null);

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
        <svg width="100%" height="100%" >
        <Subway />
        </svg>
      </ReactSVGPanZoom>
    </div>
  );
};

export default Line;
