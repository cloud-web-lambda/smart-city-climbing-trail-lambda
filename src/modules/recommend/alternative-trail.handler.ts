import { range } from 'lodash-es';

import { HttpStatus } from '@/common/constants/http-status';
import { createGatewayHandler } from '@/lambda';
import { TrailDTO } from '@/modules/recommend/dto/alternative-trail.dto';
import { ERROR_CODE } from '@/modules/recommend/exception/error-code';
import { ClimbingTrailException } from '@/modules/recommend/exception/alternative-trail.exception';
import { DIFFICULTY_KEY, DIFFICULTY_MAPPER } from '@/modules/recommend/common/climbing-trail.common';
import { getClimbingInfoApi } from '@/modules/recommend/service/alternative-trail';

export const handler = createGatewayHandler<TrailDTO>(async (req, res) => {
  const { query } = req;

  if (!query || !('lat' in query) || !('lng' in query) || !('difficulty' in query) || !('count' in query)) {
    throw new ClimbingTrailException(ERROR_CODE.MISSING_REQUIRED_PARAM);
  }

  const lat = query.lat as string;
  const lng = query.lng as string;
  const difficulty = query.difficulty as string;
  const count = parseInt(query.count as string, 10);

  if (!DIFFICULTY_KEY.includes(difficulty)) {
    throw new ClimbingTrailException(ERROR_CODE.VALID_DIFFICULTY_LEVELS);
  }

  if (isNaN(count) || count < 1) {
    throw new ClimbingTrailException(ERROR_CODE.INVALID_COUNT_PARAM);
  }

  const { response } = await getClimbingInfoApi({ lat, lng, difficulty, buffer: 20000, size: 1, page: 1 });

  if (response.error) {
    return res({
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

  // 모든 등산로를 리스트업
  const difficultyFilteredList = responseList.flatMap(({ response }) => {
    return response.result.featureCollection.features.filter(
      (trail) => trail.properties.cat_nam === DIFFICULTY_MAPPER[difficulty]
    );
  });

  if (difficultyFilteredList.length === 0) {
    throw new ClimbingTrailException(ERROR_CODE.NO_TRAILS_FOUND);
  }

  // 첫 번째 등산로의 산 이름을 가져옵니다.
  const recommendedMountainName = difficultyFilteredList[0].properties.mntn_nm;

  // 동일한 산의 등산로들만 필터링합니다.
  const sameMountainTrails = difficultyFilteredList.filter(
    (trail) => trail.properties.mntn_nm === recommendedMountainName
  );

  if (sameMountainTrails.length < count) {
    throw new ClimbingTrailException(ERROR_CODE.INVALID_COUNT_PARAM);
  }

  // count 번째 등산로를 선택합니다.
  const selectedTrail = sameMountainTrails[count];

  // 등산로 좌표를 가져옵니다.
  const trailCoordinates = selectedTrail.geometry.coordinates.flatMap((innerArray) => {
    return innerArray.map((coord) => ({
      lat: coord[1], // 위도
      lng: coord[0], // 경도
    }));
  });

  const trailName = selectedTrail.properties.mntn_nm;
  const distance = selectedTrail.properties.sec_len;
  const trailDifficulty = selectedTrail.properties.cat_nam;
  const coordinates = trailCoordinates;

  const data: TrailDTO = new TrailDTO({
    trailName,
    distance,
    difficulty: trailDifficulty,
    coordinates,
  });

  return res({
    status: HttpStatus.OK,
    body: data,
  });
});
