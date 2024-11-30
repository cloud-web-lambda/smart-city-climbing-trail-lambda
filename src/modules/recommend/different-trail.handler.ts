import { range } from 'lodash-es';

import { HttpStatus } from '@/common/constants/http-status';
import { createGatewayHandler } from '@/lambda';
import { TrailDTO } from '@/modules/recommend/dto/different-trail.dto';
import { ERROR_CODE } from '@/modules/recommend/exception/error-code';
import { ClimbingTrailException } from '@/modules/recommend/exception/climbing-trail.exception';
import { DIFFICULTY_KEY, DIFFICULTY_MAPPER } from '@/modules/recommend/common/climbing-trail.common';
import { getClimbingInfoApi } from '@/modules/recommend/service/different-trail';
import { haversineDistance } from '@/modules/utils/find-closest-trail';

export const handler = createGatewayHandler<TrailDTO>(async (req, res) => {
  const { query } = req;

  // 필수 파라미터 검증
  if (!query || !('lat' in query) || !('lng' in query) || !('difficulty' in query) || !('excludedMountains' in query)) {
    throw new ClimbingTrailException(ERROR_CODE.MISSING_REQUIRED_PARAM);
  }

  const lat = query.lat as string;
  const lng = query.lng as string;
  const difficulty = query.difficulty as string;
  const excludedMountainsParam = query.excludedMountains as string;

  // 난이도 검증
  if (!DIFFICULTY_KEY.includes(difficulty)) {
    throw new ClimbingTrailException(ERROR_CODE.VALID_DIFFICULTY_LEVELS);
  }

  // excludedMountains 파라미터 처리
  let excludedMountains: string[];
  try {
    excludedMountains = JSON.parse(excludedMountainsParam);
    if (!Array.isArray(excludedMountains) || excludedMountains.length === 0) {
      throw new Error();
    }
  } catch {
    throw new ClimbingTrailException(ERROR_CODE.INVALID_EXCLUDED_MOUNTAINS_PARAM);
  }

  // 등산로 데이터 가져오기
  const { response } = await getClimbingInfoApi({
    lat,
    lng,
    difficulty,
    buffer: 20000,
    size: 1,
    page: 1,
  });

  if (response.error) {
    return res({
      status: HttpStatus.BAD_REQUEST,
      body: response,
    });
  }

  const totalData = response.record.total;
  const responseList = await Promise.all(
    range(1, Math.ceil(totalData / 1000) + 1).map((page) => {
      return getClimbingInfoApi({
        lat,
        lng,
        difficulty,
        buffer: 20000,
        size: 1000,
        page,
      });
    })
  );

  // 난이도로 필터링된 모든 등산로 목록
  const difficultyFilteredList = responseList.flatMap(({ response }) => {
    return response.result.featureCollection.features.filter(
      (trail) => trail.properties.cat_nam === DIFFICULTY_MAPPER[difficulty]
    );
  });

  if (difficultyFilteredList.length === 0) {
    throw new ClimbingTrailException(ERROR_CODE.NO_TRAILS_FOUND);
  }

  // 제외할 산들을 제외하고 등산로 목록 필터링
  const filteredTrails = difficultyFilteredList.filter(
    (trail) => !excludedMountains.includes(trail.properties.mntn_nm)
  );

  if (filteredTrails.length === 0) {
    throw new ClimbingTrailException(ERROR_CODE.NO_ALTERNATIVE_TRAILS_FOUND);
  }

  let closestTrail: any = null;
  let shortestDistance = Infinity;

  // 남은 등산로 중에서 가장 가까운 등산로 찾기
  filteredTrails.forEach((item) => {
    const coordinates = item.geometry.coordinates;
    coordinates.forEach((innerArray) => {
      const firstCoord = innerArray[0];
      const trailLat = firstCoord[1];
      const trailLng = firstCoord[0];
      const distance = haversineDistance(Number(lat), Number(lng), trailLat, trailLng);

      if (distance < shortestDistance) {
        shortestDistance = distance;
        closestTrail = item;
      }
    });
  });

  if (closestTrail != null) {
    const trailCoordinates = closestTrail.geometry.coordinates.flatMap((innerArray) => {
      return innerArray.map((coord) => ({
        lat: coord[1],
        lng: coord[0],
      }));
    });

    const trailName = closestTrail.properties.mntn_nm;
    const distance = closestTrail.properties.sec_len;
    const trailDifficulty = closestTrail.properties.cat_nam;
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
  }

  throw new ClimbingTrailException(ERROR_CODE.NO_ALTERNATIVE_TRAILS_FOUND);
});
