// src/modules/mountain-info/weather/getWeatherAlert.ts

import { dataPortalApiClient } from '@/utils/apiClient';
import { WeatherDTO } from '../dto/weather.dto';
import { WeatherException } from '../exception/weather.exception';
import { WEATHER_ERROR_CODE } from '../exception/weather-error-code';
import moment from 'moment-timezone';

/**
 * 위도와 경도를 격자 좌표(nx, ny)로 변환하는 함수
 */
const convertToGrid = (lat: number, lon: number): { nx: number; ny: number } => {
  const RE = 6371.00877;
  const GRID = 5.0;
  const SLAT1 = 30.0;
  const SLAT2 = 60.0;
  const OLON = 126.0;
  const OLAT = 38.0;
  const XO = 210 / GRID;
  const YO = 675 / GRID;

  const DEGRAD = Math.PI / 180.0;

  const re = RE / GRID;
  const slat1 = SLAT1 * DEGRAD;
  const slat2 = SLAT2 * DEGRAD;
  const olon = OLON * DEGRAD;
  const olat = OLAT * DEGRAD;

  let sn = Math.tan(Math.PI * 0.25 + slat2 * 0.5) / Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sn = Math.log(Math.cos(slat1) / Math.cos(slat2)) / Math.log(sn);
  let sf = Math.tan(Math.PI * 0.25 + slat1 * 0.5);
  sf = (Math.pow(sf, sn) * Math.cos(slat1)) / sn;
  let ro = Math.tan(Math.PI * 0.25 + olat * 0.5);
  ro = (re * sf) / Math.pow(ro, sn);

  let ra = Math.tan(Math.PI * 0.25 + lat * DEGRAD * 0.5);
  ra = (re * sf) / Math.pow(ra, sn);
  let theta = lon * DEGRAD - olon;
  if (theta > Math.PI) theta -= 2.0 * Math.PI;
  if (theta < -Math.PI) theta += 2.0 * Math.PI;
  theta *= sn;

  const nx = Math.floor(ra * Math.sin(theta) + XO + 0.5);
  const ny = Math.floor(ro - ra * Math.cos(theta) + YO + 0.5);

  return { nx, ny };
};

/**
 * 기상청 API를 호출하여 날씨 정보를 가져오는 함수
 * @param lat 위도
 * @param lon 경도
 * @returns WeatherDTO
 */
export const getWeatherAlert = async (lat: number, lon: number): Promise<WeatherDTO> => {
  const maxRetries = 6; // 최대 6회 재시도 (6시간 전까지)
  let attempt = 0;
  let weatherData: WeatherDTO | null = null;

  // 격자 좌표 변환
  const { nx, ny } = convertToGrid(lat, lon);
  console.log(`lat=${lat}, lon=${lon}, nx=${nx}, ny=${ny}`);

  while (attempt < maxRetries && !weatherData) {
    try {
      // 현재 시각 기준으로 40분 + 60분 * attempt 이전의 시각을 사용
      let now = moment()
        .tz('Asia/Seoul')
        .subtract(40 + attempt * 60, 'minutes');
      let base_date = now.format('YYYYMMDD');
      let base_time = now.format('HH') + '00'; // 발표 시각은 매시 00분

      // 만약 시간이 음수가 되면, 날짜를 하루 전으로 변경하고 시간을 23시로 설정
      if (now.hour() < 0) {
        now = now.subtract(1, 'day').hour(23);
        base_date = now.format('YYYYMMDD');
        base_time = '2300';
      }

      console.log(`Attempt ${attempt + 1}: base_date=${base_date}, base_time=${base_time}`);

      const response = await dataPortalApiClient.get('/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst', {
        params: {
          pageNo: 1,
          numOfRows: 1000, // 데이터 양을 늘려보기
          dataType: 'JSON',
          base_date,
          base_time,
          nx,
          ny,
        },
      });

      console.log('Full API Response:', JSON.stringify(response.data, null, 2));
      console.log('API Response Header:', response.data.response.header);

      const resultCode = response.data.response.header.resultCode;
      const resultMsg = response.data.response.header.resultMsg;

      if (resultCode === '00') {
        // 정상 응답
        const items = response.data.response.body.items.item;

        if (!items || items.length === 0) {
          throw new WeatherException(WEATHER_ERROR_CODE.NO_DATA_FOUND);
        }

        const temperature = parseFloat(items.find((item: any) => item.category === 'T1H')?.obsrValue || '0');
        const condition = parseInt(items.find((item: any) => item.category === 'PTY')?.obsrValue || '0', 10);
        const windSpeed = parseFloat(items.find((item: any) => item.category === 'WSD')?.obsrValue || '0');

        weatherData = new WeatherDTO({
          temperature,
          condition,
          windSpeed,
        });

        console.log(`Weather Data Retrieved: ${JSON.stringify(weatherData)}`);
      } else if (resultCode === '03') {
        // NO_DATA 응답일 경우, 재시도
        console.warn(`NO_DATA received. Retrying with earlier time...`);
        attempt += 1;
      } else {
        // 다른 에러 코드일 경우, 예외 던지기
        console.error(`API Error: ${resultMsg} (Code: ${resultCode})`);
        throw new WeatherException(WEATHER_ERROR_CODE.FETCH_FAILED);
      }
    } catch (error) {
      console.error(`Attempt ${attempt + 1} failed:`, error);

      if (error instanceof WeatherException && error === WEATHER_ERROR_CODE.NO_DATA_FOUND) {
        // 'NO_DATA_FOUND' 에러일 경우, 재시도
        attempt += 1;
      } else {
        // 다른 에러일 경우, 재시도하지 않고 종료
        throw error;
      }
    }
  }

  if (!weatherData) {
    throw new WeatherException(WEATHER_ERROR_CODE.NO_DATA_FOUND);
  }

  return weatherData;
};
