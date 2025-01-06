import { useEffect, useState, useMemo } from "react";
import { useTranslation } from 'react-i18next';
import Weather from './Weather';
import TranslationDropdown from './TranslationDropdown';
import Navigation from "./Navigation";
import './css/Visual.css'
import './css/media-Visual.css'

function Visual (){
  const { t } = useTranslation(); // useTranslation 훅 사용
  const visuals = t('visuals', { returnObjects: true });
  // console.log(visuals);
  const [visualStates, setVisualStates] = useState([]);
  const [visualEffects, setVisualEffects] = useState([
    { zIndex: -10, opacity: 1 },
    { zIndex: -20, opacity: 0 },
    { zIndex: -20, opacity: 0 }
  ]);
  const [isActive, setIsActive] = useState(true);
  const [intervalId, setIntervalId] = useState(null);
  const intervalTime = 5000;
  

  // 이미지 전환 로직을 함수화
  const updateVisualEffects = () => {
    setVisualEffects((prevEffects) => {
      const newEffects = [...prevEffects];
      const lastEffect = newEffects.pop();
      newEffects.unshift(lastEffect);

      setIsActive(false); // 먼저 active 클래스 제거
      setVisualEffects(newEffects);
      
      setTimeout(() => {
        setIsActive(true); 
      }, 100);

      return newEffects;
    });
  };
    // 데이터 파일을 불러옵니다.
    const fetchData = async () => {
      const response = await fetch('/src/data/visualData.json');
      const data = await response.json();
      setVisualStates(data);
    };

  useEffect(() => {

    fetchData(); // JSON 파일 불러오기

    // 기존 인터벌 설정
    const interval = setInterval(updateVisualEffects, intervalTime);
    setIntervalId(interval); 


    return () => {clearInterval(interval);};
  }, []);



  const visibleImageIndex = useMemo(() => {
    return visualEffects.findIndex((effect) => effect.zIndex === -10);
  }, [visualEffects]);

  // dot 클릭 시 이미지 전환
  const handleDotClick = (index) => {
    const newEffects = visualEffects.map((effect, i) => ({
      zIndex: i === index ? -10 : -20,
      opacity: i === index ? 1 : 0,
    }));
    setIsActive(false); 
    setVisualEffects(newEffects);
    setTimeout(() => {
      setIsActive(true); 
    }, 10);

    clearInterval(intervalId); // 기존 인터벌 클리어
    const restartedInterval = setInterval(updateVisualEffects, intervalTime);
    setIntervalId(restartedInterval); // 기존 interval ID 업데이트

    
  };
  
  return(
    <section id="main-visual">

      <article className='main-top'>
        <div className='logo'><h1>{t('logo')}</h1></div>
        <div className='main-top-func'>
          <div className="main-weather">
          <Weather />
          </div>
          <div className="main-translation">
            <TranslationDropdown />
          </div>
        </div>
      </article>
      {/* 메인 이미지 */}
      <article className='main-img-box'>
      {visualStates.map((state, index) => (
          <div
            key={index}
            className="main-img-ctrl"
            style={{
              opacity: visualEffects[index]?.opacity,
              zIndex: visualEffects[index]?.zIndex
            }}
          >
            <img src={state.imageSrc} alt={`Image ${index + 1}`} />
          </div>
        ))}
      </article>

      {/* 텍스트 구간 */}
      <article className={`main-visual-text ${isActive ? 'active' : ''}`}>
        <div>
          {/* 보이는 이미지에 해당하는 텍스트만 표시 */}
          <p>{visuals[visibleImageIndex]?.title}</p>
          <p>{visuals[visibleImageIndex]?.subtitle}</p>
          <p>{visuals[visibleImageIndex]?.period}</p>
          <button>{t('seeDetails')}</button>
        </div>
      </article>

{/* ---------------------- 비주얼 제어 */}
    <div className='main-visual-ctrl'>
      <div className='main-dots'>
      {visualStates.map((state, index) => (
            <div
              key={index}
              className={`dot ${index === visibleImageIndex ? 'active' : ''}`} // 보이는 이미지에 맞는 dot에 active 클래스 추가
              onClick={() => handleDotClick(index)}
            ></div>
          ))}
      </div>

      {/* Progress bar */}
      <div className="main-bar">
        <div className={`progress ${isActive ? 'active' : ''}`}></div>
      </div>
    </div>
      
      <div className="main-nav-ctrl">
        <Navigation />
      </div>

    </section>
  )

}
  export default Visual;