import { HttpStatus } from '@/common/constants/http-status';
import { createGatewayHandler } from '@/lambda';
import { hikerDTO } from './dto/mypage.dto';
import { HikerException } from './exception/hiker.exception';
import { ERROR_CODE } from './exception/error-code';
import connectDB from '@/utils/dbClient';
import HikerInfo from './dto/hikerInfo';

// 몸무게 조회 기능
export const handler = createGatewayHandler<hikerDTO>(async (req, res) => {
  const { query } = req;

  const { sub } = req.query as { sub: string };

  if (!sub) throw new HikerException(ERROR_CODE.MISSING_REQUIRED_PARAM);

  await connectDB();

  // 기존에 해당 sub로 사용자가 있는지 확인
  const user = await HikerInfo.findOne({ sub });

  if (!user) {
    // 사용자가 없으면 예외 처리
    throw new HikerException(ERROR_CODE.USER_NOT_FOUND);
  }

  // 응답을 위한 DTO 객체 생성
  const hikerData = new hikerDTO({
    sub: user.sub,
    weight: user.weight,
  });

  //await HikerInfo.deleteOne({ sub }); // 데이터 삭제

  // 성공적으로 데이터를 반환
  return res({
    status: HttpStatus.OK,
    body: hikerData,
  });
});
