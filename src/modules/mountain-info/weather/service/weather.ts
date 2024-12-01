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
 * 기상청 API 응답 인터페이스 정의
 */
interface ApiResponseHeader {
  resultCode: string;
  resultMsg: string;
}

interface ApiResponseBody {
  baseDate: string;
  baseTime: string;
  items: {
    item: Array<{
      category: string;
      obsrValue: string;
    }>;
  };
}

interface ApiResponseData {
  response: {
    header: ApiResponseHeader;
    body: ApiResponseBody;
  };
}

/**
 * 기상청 API를 호출하여 날씨 정보를 가져오는 함수
 * @param lat 위도
 * @param lon 경도
 * @returns WeatherDTO
 */
export const getWeatherAlert = async (lat: number, lon: number): Promise<WeatherDTO> => {
  const maxRetries = 24; // 최대 24회 시도

  // 격자 좌표 변환
  const { nx, ny } = convertToGrid(lat, lon);
  console.log(`lat=${lat}, lon=${lon}, nx=${nx}, ny=${ny}`);

  // 모든 시도에 대한 base_date와 base_time 계산
  const requestTimes = Array.from({ length: maxRetries }, (_, index) => {
    // 현재 시각 기준으로 10분 + 60분 * attempt 이전의 시각을 사용
    const time = moment()
      .tz('Asia/Seoul')
      .subtract(10 + index * 60, 'minutes');
    const base_date = time.format('YYYYMMDD');
    const base_time = time.format('HH') + '00'; // 발표 시각은 매시 00분

    return { base_date, base_time };
  });

  console.log(requestTimes);

  /**
   * 단일 API 요청을 수행하고 WeatherDTO를 반환하는 헬퍼 함수
   * @param base_date API 요청 기준 날짜
   * @param base_time API 요청 기준 시간
   * @returns WeatherDTO
   * @throws WeatherException
   */
  const fetchWeather = async (base_date: string, base_time: string): Promise<WeatherDTO> => {
    try {
      const response = await dataPortalApiClient.get<ApiResponseData>(
        '/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst',
        {
          params: {
            pageNo: 1,
            numOfRows: 10, // 데이터 양을 줄여보기 (테스트용)
            dataType: 'JSON',
            base_date,
            base_time,
            nx,
            ny,
          },
        }
      );

      console.log('Full API Response:', JSON.stringify(response.data, null, 2));
      console.log('API Response Header:', response.data.response.header);

      const { resultCode, resultMsg } = response.data.response.header;

      if (resultCode === '00') {
        // 정상 응답
        const items = response.data.response.body.items.item;

        if (!items || items.length === 0) {
          throw new WeatherException(WEATHER_ERROR_CODE.NO_DATA_FOUND);
        }

        const temperature = parseFloat(items.find((item) => item.category === 'T1H')?.obsrValue || '0');
        const condition = parseInt(items.find((item) => item.category === 'PTY')?.obsrValue || '0', 10);
        const windSpeed = parseFloat(items.find((item) => item.category === 'WSD')?.obsrValue || '0');

        const weatherData = new WeatherDTO({
          temperature,
          condition,
          windSpeed,
        });

        console.log(`Weather Data Retrieved: ${JSON.stringify(weatherData)}`);

        return weatherData;
      } else {
        // 에러 코드가 있는 경우, 실패로 간주
        throw new Error(`API Error: ${resultMsg} (Code: ${resultCode})`);
      }
    } catch (error) {
      console.error(`API request failed for base_date=${base_date}, base_time=${base_time}:`, error);
      throw error;
    }
  };

  // 모든 API 요청을 비동기적으로 실행
  const apiPromises = requestTimes.map(({ base_date, base_time }) => fetchWeather(base_date, base_time));

  try {
    // Promise.any을 사용하여 가장 먼저 성공한 응답을 반환
    const firstSuccess = await Promise.any(apiPromises);

    return firstSuccess;
  } catch (aggregateError) {
    console.error('All API attempts failed:', aggregateError);
    throw new WeatherException(WEATHER_ERROR_CODE.FETCH_FAILED);
  }
};
