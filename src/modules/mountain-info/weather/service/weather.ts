import { dataPortalApiClient } from '@/utils/apiClient';
import { WeatherDTO } from '@/modules/mountain-info/weather/dto/weather.dto';
import { WeatherException } from '../exception/weather.exception';
import { WEATHER_ERROR_CODE } from '../exception/weather-error-code';

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

export const getWeatherAlert = async (lat: number, lon: number): Promise<WeatherDTO> => {
  try {
    // 위도와 경도를 기상청 API의 격자 좌표로 변환
    const { nx, ny } = convertToGrid(lat, lon);

    // 현재 날짜와 시간 (API에서 요구하는 포맷)
    const today = new Date();
    const base_date = today.toISOString().slice(0, 10).replace(/-/g, '');

    // 현재 시간을 기반으로 base_time 설정
    const hours = today.getHours();
    const minutes = today.getMinutes();

    // 초단기실황 데이터의 업데이트는 매시 10분마다 진행됨
    // 10분을 기준으로 이전 시간 사용 여부 결정
    const base_time =
      minutes < 10 ? `${(hours - 1).toString().padStart(2, '0')}00` : `${hours.toString().padStart(2, '0')}00`;

    const response = await dataPortalApiClient.get('/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst', {
      params: {
        pageNo: 1,
        numOfRows: 10,
        dataType: 'JSON',
        base_date,
        base_time,
        nx,
        ny,
      },
    });

    if (!response.data.response.body.items || response.data.response.body.items.length === 0) {
      throw new WeatherException(WEATHER_ERROR_CODE.NO_DATA_FOUND);
    }

    const weatherData = response.data.response.body.items.item;
    const temperature = parseFloat(weatherData.find((item) => item.category === 'T1H')?.obsrValue);
    const condition = parseInt(weatherData.find((item) => item.category === 'PTY')?.obsrValue, 10);
    const windSpeed = parseFloat(weatherData.find((item) => item.category === 'WSD')?.obsrValue);

    return new WeatherDTO({
      temperature,
      condition,
      windSpeed,
    });
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw new WeatherException(WEATHER_ERROR_CODE.FETCH_FAILED);
  }
};
