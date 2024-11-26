import { range } from 'lodash-es';

import { HttpStatus } from '@/common/constants/http-status';
import { createGatewayHandler } from '@/lambda';
import { TrailDTO } from '@/modules/recommend/dto/climbing-trail.dto';
import { ERROR_CODE } from '@/modules/recommend/exception/error-code';
import { ClimbingTrailException } from '@/modules/recommend/exception/climbing-trail.exception';
import { DIFFICULTY_KEY, DIFFICULTY_MAPPER } from '@/modules/recommend/common/climbing-trail.common';
import { getClimbingInfoApi } from '@/modules/recommend/service/climbing-trail';
import { haversineDistance } from '@/modules/utils/find-closest-trail';

export const handler = createGatewayHandler<TrailDTO>(async (req, res) => {
  const { query } = req;

  if (!query || !('lat' in query) || !('lng' in query) || !('difficulty' in query))
    throw new ClimbingTrailException(ERROR_CODE.MISSING_REQUIRED_PARAM);
  const lat = query.lat as string;
  const lng = query.lng as string;
  const difficulty = query.difficulty as string;

  if (!DIFFICULTY_KEY.includes(difficulty)) throw new ClimbingTrailException(ERROR_CODE.VALID_DIFFICULTY_LEVELS);

  const { response } = await getClimbingInfoApi({ lat, lng, difficulty, buffer: 20000, size: 1, page: 1 });

  if (response.error) {
    res({
      status: HttpStatus.BAD_REQUEST,
      body: response,
    });
  }

  const totalData = response.record.total;
  const responseList = await Promise.all(
    range(1, Math.ceil(totalData / 1000) + 1).map((page) => {
      return getClimbingInfoApi({ lat, lng, difficulty, buffer: 20000, size: 1000, page });
    })
  );

  const difficultyFilteredList = responseList.flatMap(({ response }) => {
    return response.result.featureCollection.features.filter(
      (trail) => trail.properties.cat_nam === DIFFICULTY_MAPPER[difficulty]
    );
  });

  let closestTrail: any = null;
  let shortestDistance = Infinity; // 가장 짧은 거리를 찾기 위해 큰 값으로 초기화

  // difficultyFilteredList 순회
  difficultyFilteredList.forEach((item) => {
    // item.geometry.coordinates에서 첫 번째 좌표 가져오기
    const coordinates = item.geometry.coordinates;
    coordinates.forEach((innerArray) => {
      const firstCoord = innerArray[0]; // 첫 번째 내포된 배열
      const trailLat = firstCoord[1]; // 위도
      const trailLng = firstCoord[0]; // 경도

      // 사용자와 해당 등산로와의 거리 계산
      const distance = haversineDistance(Number(lat), Number(lng), trailLat, trailLng);

      // 가장 가까운 등산로를 업데이트
      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestTrail = item; // 가장 가까운 등산로 저장
      }
    });
  });

  if (closestTrail != null) {
    // 등산로 좌표를 geometry.coordinates에서 가져오기
    const trailCoordinates = closestTrail.geometry.coordinates.flatMap((innerArray) => {
      return innerArray.map((coord) => ({
        lat: coord[1], // 위도
        lng: coord[0], // 경도
      }));
    });

    const trailName = closestTrail.properties.mntn_nm;
    const distance = closestTrail.properties.sec_len;
    const difficulty = closestTrail.properties.cat_nam;
    const coordinates = trailCoordinates;

    const data: TrailDTO = new TrailDTO({ trailName, distance, difficulty, coordinates });
    return res({
      status: HttpStatus.OK,
      body: data,
    });
  }

  throw new ClimbingTrailException(ERROR_CODE.INVALID_CLOSEST_TRAIL);
});
