import { HttpStatus } from '@/common/constants/http-status';
import { createGatewayHandler } from '@/lambda';
import { hikerDTO } from './dto/mypage.dto';
import { HikerException } from './exception/hiker.exception';
import { ERROR_CODE } from './exception/error-code';
import connectDB from '@/utils/dbClient';
import HikerInfo from './dto/hikerInfo'; // HikerInfo 모델을 가져옵니다.

// 몸무게 업데이트 기능
export const handler = createGatewayHandler<hikerDTO>(async (req, res) => {

  const { sub, weight } = req.body as { sub: string; weight: number };

  if (!sub || !weight) throw new HikerException(ERROR_CODE.MISSING_REQUIRED_PARAM);
  // 쿼리 파라미터에서 sub(사용자 고유 ID)와 weight(몸무게) 값을 추출

  // DB 연결
  await connectDB();

  // 기존에 해당 sub로 사용자가 있는지 확인
  let user = await HikerInfo.findOne({ sub });
  console.log('check');

  if (user) {
    // 기존 사용자 데이터가 있으면, 몸무게만 업데이트
    user.weight = weight;
    await user.save(); // DB에 저장
    console.log('User weight updated');
  } else {
    // 새로운 사용자는 새로 생성
    user = new HikerInfo({
      sub,
      weight,
    });
    await user.save(); // DB에 저장
    console.log('New user created');
  }

  // 응답을 위한 DTO 객체 생성
  const hikerData = new hikerDTO({
    sub: user.sub,
    weight: user.weight,
  });

  // 성공적으로 데이터를 반환
  return res({
    status: HttpStatus.OK,
    body: hikerData,
  });
});
