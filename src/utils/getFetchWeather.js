import districtCoordinates from '/src/data/district_nx_ny_values.json'; // JSON 파일 import
import { getBaseTime } from '../map/utils/timeUtils';

// 날씨 데이터를 가져오는 함수
export const getWeatherData = async (districtName) => {
  if (!districtCoordinates[districtName]) {
    throw new Error('해당 구의 데이터를 찾을 수 없습니다.');
  }

  const { nx, ny } = districtCoordinates[districtName]; // 구 이름에 해당하는 nx, ny 좌표

  const serviceKey = '5CQeftawhDwl1cz9L0RxxMn8mjHETjXzCuHxHgteyt%2FvAK1i50baokozMpWbrG%2FEb2yMXkwSwn18uBEylgUk0g%3D%3D';
  const baseDate = new Date().toISOString().slice(0, 10).replace(/-/g, ''); // 오늘 날짜
  const baseTime = getBaseTime(); // 예시 시간 (시간은 동적으로 가져오는 함수 사용)
  const numOfRows = 1000;
  const pageNo = 1;
  const dataType = 'JSON';

  // API URL
  const url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst?serviceKey=${serviceKey}&pageNo=${pageNo}&numOfRows=${numOfRows}&dataType=${dataType}&base_date=${baseDate}&base_time=${baseTime}&nx=${nx}&ny=${ny}`;

  try {
    const response = await fetch(url); // API 호출
    const data = await response.json(); // JSON 응답 파싱
    const items = data.response.body.items.item;

    // 최저/최고 온도를 추출하는 로직
    const temperatureData = items.filter(item => item.category === 'T1H'); // 'T1H'는 온도 데이터 카테고리

    let minTemp = null;
    let maxTemp = null;

    // 날씨 상태 추출 (예시로 'SKY' 카테고리 사용)
    const skyData = items.find(item => item.category === 'SKY'); // 'SKY'는 하늘 상태 카테고리 (맑음, 흐림 등)
    const skyCondition = skyData ? skyData.fcstValue : ''; // 날씨 상태 값 (0: 맑음, 1: 흐림, 2: 비, 3: 눈 등)

    let weatherStatus = skyCondition; // 날씨 상태


    // 온도 계산
    temperatureData.forEach(item => {
      const temp = parseFloat(item.fcstValue); // 온도 값을 숫자로 변환
      if (minTemp === null || temp < minTemp) minTemp = temp;
      if (maxTemp === null || temp > maxTemp) maxTemp = temp;
    });

    return { districtName,minTemp, maxTemp, weatherStatus }; // 날씨 상태와 온도 값 반환
  } catch (err) {
    throw new Error('날씨 데이터를 가져오는 데 오류가 발생했습니다.');
  }
};
