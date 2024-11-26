import dayjs from "dayjs";
import { ClimbingTotalDTO } from "./dto/climbing-total.dto";
import ClimbingTrackModel from "./dto/climbing-track";
import { HttpStatus } from '@/common/constants/http-status';
import { createGatewayHandler } from '@/lambda';
import { ERROR_CODE } from "./exception/error-code";
import { ClimbingTrackException } from "./exception/climbing-track.exception";
import connectDB from "@/utils/dbClient";

export const handler = createGatewayHandler<ClimbingTotalDTO>(async (req, res) => {
    
    const { sub } = req.params as { sub:string };
    const { year, month } = req.query as { year:string, month:string};

    // year, month 쿼리 파라미터가 없으면 BadRequestError 반환
    if (!year || !month) {
      throw new ClimbingTrackException(ERROR_CODE.MISSING_REQUIRED_PARAM);
    }

    // year와 month의 형식이 올바른지 체크
    if (!dayjs(`${year}-${month}-01`).isValid()) {
        throw new ClimbingTrackException(ERROR_CODE.NOT_FORMAT);
    }

    await connectDB();

    // MongoDB에서 userId와 해당 month의 클라이밍 기록 조회
    const userMonthlyClimbingTracks = await ClimbingTrackModel.findOne({
      sub,
      startDate: {
        $gte: dayjs(`${year}-${month}-01`).startOf('month').toDate(), // 해당 월의 첫 번째 날 이후
        $lt: dayjs(`${year}-${month}-01`).endOf('month').toDate()  // 해당 월의 마지막 날 이전
      }
    }).exec();

    // 클라이밍 기록이 없으면 NotFoundError 반환
    if (!userMonthlyClimbingTracks || !userMonthlyClimbingTracks.tracks || userMonthlyClimbingTracks.tracks.length === 0) {
        throw new ClimbingTrackException(ERROR_CODE.NOT_FOUND);
    }

    const monthlyClimbingTracks = userMonthlyClimbingTracks.tracks;

    // 트레일 이름 추출
    const trails = monthlyClimbingTracks.map((track) => track.trailName);

    // 총 등산 시간, 총 거리, 총 칼로리 계산
    const [totalHikingTime, totalDistance, totalCalories] = monthlyClimbingTracks.reduce(
      (acc, cur) => {
        const hikingTime = dayjs(cur.endDate).diff(dayjs(cur.startDate), "minute");
        return [acc[0] + hikingTime, acc[1] + cur.distance, acc[2] + cur.calories];
      },
      [0, 0, 0]
    );

    // 평균 등산 시간, 평균 거리, 평균 칼로리 계산
    const [averageHikingTime, averageDistance, averageCalories] = [
      totalHikingTime / monthlyClimbingTracks.length,
      totalDistance / monthlyClimbingTracks.length,
      totalCalories / monthlyClimbingTracks.length
    ];

    const data: ClimbingTotalDTO = new ClimbingTotalDTO({ 
        totalHikingTime, totalDistance, 
        totalCalories, averageHikingTime,
        averageDistance, averageCalories, trails
     });

    return res({
      status: HttpStatus.OK,
      body: data,
    });
});