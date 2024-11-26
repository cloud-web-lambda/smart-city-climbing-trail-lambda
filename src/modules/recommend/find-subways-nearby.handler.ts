import { HttpStatus } from '@/common/constants/http-status';
import { createGatewayHandler } from '@/lambda';
import { SubwayStationDTO } from './dto/subway-station.dto';
import SubwayStationModel, { SubwayStation } from './dto/subway-station';
import { ERROR_CODE } from '@/modules/recommend/exception/error-code';
import { ClimbingTrailException } from '@/modules/recommend/exception/climbing-trail.exception';
import { haversineDistance } from '@/modules/utils/find-closest-trail';
import connectDB from '@/utils/dbClient';

export const handler = createGatewayHandler<SubwayStationDTO>(async (req, res) => {
    
    const { query } = req;
    // 요청에서 lat와 lng가 있는지 확인
    if (!query || !('lat' in query) || !('lng' in query)) {
        throw new ClimbingTrailException(ERROR_CODE.MISSING_REQUIRED_PARAM);
    }

    const lat = parseFloat(query.lat as string);
    const lng = parseFloat(query.lng as string);

    await connectDB();

    const subwayStations = await SubwayStationModel.find();

    if (!subwayStations || subwayStations.length === 0) {
        throw new ClimbingTrailException(ERROR_CODE.NO_SUBWAY_STATIONS);
    }

    // 가장 가까운 역을 찾기 위한 변수 초기화
    let closestStation: SubwayStation | null = null;
    let minDistance = Infinity;

    // 모든 지하철 역에 대해 거리 계산
    subwayStations.forEach((station) => {
        const distance = haversineDistance(lat, lng, station.lat, station.lng);

        if (distance < minDistance) {
        minDistance = distance;
        closestStation = station; // 가장 가까운 역을 업데이트
        }
    });

    if (!closestStation) {
        throw new ClimbingTrailException(ERROR_CODE.NO_CLOSEST_STATION_FOUND);
    }

    const data: SubwayStationDTO = new SubwayStationDTO({
        stationName: (closestStation as SubwayStation).stationName, // 타입 단언을 사용
        stationLine: (closestStation as SubwayStation).stationLine,
        lat: (closestStation as SubwayStation).lat,
        lng: (closestStation as SubwayStation).lng,
    });

    // 응답 객체 생성 및 반환
    return res({
        status: HttpStatus.OK,
        body: data,
    });
});
