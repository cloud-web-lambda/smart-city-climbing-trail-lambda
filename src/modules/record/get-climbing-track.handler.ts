import dayjs from 'dayjs';
import { ClimbingTotalDTO } from './dto/climbing-total.dto';
import ClimbingTrackModel from './dto/climbing-track';
import { HttpStatus } from '@/common/constants/http-status';
import { createGatewayHandler } from '@/lambda';
import { ERROR_CODE } from './exception/error-code';
import { ClimbingTrackException } from './exception/climbing-track.exception';
import connectDB from '@/utils/dbClient';

export const handler = createGatewayHandler<ClimbingTotalDTO>(async (req, res) => {
  const { sub } = req.params as { sub: string };

  await connectDB();

  // MongoDB에서 userId로 클라이밍 기록을 조회
  const userClimbingTrack = await ClimbingTrackModel.findOne({ sub }).exec();

  // 클라이밍 기록이 없다면 에러 처리
  if (!userClimbingTrack || !userClimbingTrack.tracks || userClimbingTrack.tracks.length === 0) {
    throw new ClimbingTrackException(ERROR_CODE.NOT_FOUND);
  }

  const climbingTracks = userClimbingTrack.tracks;

  // 트레일 이름 추출
  const trails = climbingTracks.map((track) => track.trailName);

  // 총 등산 시간, 총 거리, 총 칼로리 계산
  const [totalHikingTime, totalDistance, totalCalories] = climbingTracks.reduce(
    (acc, cur) => {
      const hikingTime = dayjs(cur.endDate).diff(dayjs(cur.startDate), 'minute');
      return [acc[0] + hikingTime, acc[1] + cur.distance, acc[2] + cur.calories];
    },
    [0, 0, 0]
  );

  // 평균 등산 시간, 평균 거리, 평균 칼로리 계산
  const [averageHikingTime, averageDistance, averageCalories] = [
    totalHikingTime / climbingTracks.length,
    totalDistance / climbingTracks.length,
    totalCalories / climbingTracks.length,
  ];

  const data: ClimbingTotalDTO = new ClimbingTotalDTO({
    totalHikingTime,
    totalDistance,
    totalCalories,
    averageHikingTime,
    averageDistance,
    averageCalories,
    trails,
  });

  //await ClimbingTrackModel.deleteOne({ sub });

  return res({
    status: HttpStatus.OK,
    body: data,
  });
});
