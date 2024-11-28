import { createGatewayHandler } from '@/lambda';
import { HttpStatus } from '@/common/constants/http-status';
import { getSubwayStationApi } from './service/subway-station';
import SubwayStationModel from './dto/subway-station';
import { SubwayStationDTO } from './dto/subway-station.dto';
import connectDB from '@/utils/dbClient';
import { range } from 'lodash-es';

export const handler = createGatewayHandler<SubwayStationDTO>(async (req, res) => {
  //await connectDB();

  // API에서 지하철 역 데이터 가져오기
  const subwayStation = await getSubwayStationApi();

  const subwayStations = subwayStation.data.map((station) => {
    return new SubwayStationDTO({
      stationName: station.역명,
      stationLine: station.호선,
      lat: parseFloat(station.위도),
      lng: parseFloat(station.경도),
    });
  });

  console.log(subwayStations);

  //const savedStations = await SubwayStationModel.insertMany(subwayStations);
  // 모든 데이터 삭제
  // await SubwayStationModel.deleteMany({});

  //console.log(savedStations); // 저장된 역 데이터 확인

  // 저장된 역이 확인되면 "message": "지하철 정보가 업로드되었습니다." 로 변경

  return res({
    status: HttpStatus.OK,
    body: subwayStations,
  });
});
